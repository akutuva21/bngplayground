import type { BNGLModel, BNGLObservable } from '../../../types.ts';
import { Species } from './core/Species.ts';
import { Rxn } from './core/Rxn.ts';
import { BNGLParser } from './core/BNGLParser.ts';
import { GraphMatcher } from './core/Matcher.ts';
import { GraphCanonicalizer } from './core/Canonical.ts';
import { countEmbeddingDegeneracy } from './core/degeneracy.ts';

export class NetworkExporter {
  private static requiresGeneratedFunction(expr: string, model: BNGLModel): boolean {
    if (this.containsObservables(expr, model)) return true;
    if (/\bSpecies\d+\b/.test(expr)) return true;
    if (/\b(reactants|products)\b/.test(expr)) return true;

    const fnCallRegex = /\b([A-Za-z_]\w*)\s*\(/g;
    let match: RegExpExecArray | null;
    while ((match = fnCallRegex.exec(expr)) !== null) {
      const name = match[1];
      const isModelFunction = model.functions?.some((f) => f.name === name) ?? false;
      if (isModelFunction) return true;
    }

    return false;
  }

  private static splitObservablePatterns(pattern: string): string[] {
    const parts: string[] = [];
    let start = 0;
    let parenDepth = 0;
    let braceDepth = 0;
    let bracketDepth = 0;

    for (let i = 0; i < pattern.length; i++) {
      const ch = pattern[i];
      if (ch === '(') parenDepth++;
      else if (ch === ')') parenDepth = Math.max(0, parenDepth - 1);
      else if (ch === '{') braceDepth++;
      else if (ch === '}') braceDepth = Math.max(0, braceDepth - 1);
      else if (ch === '[') bracketDepth++;
      else if (ch === ']') bracketDepth = Math.max(0, bracketDepth - 1);
      else if (ch === ',' && parenDepth === 0 && braceDepth === 0 && bracketDepth === 0) {
        const token = pattern.slice(start, i).trim();
        if (token.length > 0) parts.push(token);
        start = i + 1;
      }
    }

    const tail = pattern.slice(start).trim();
    if (tail.length > 0) parts.push(tail);
    return parts;
  }

  private static formatNumericFactor(v: number): string {
    if (!Number.isFinite(v)) return 'NaN';
    if (Math.abs(v) < 1e-15) return '0';
    // Keep enough precision for parity while staying compact.
    return Number(v.toPrecision(12)).toString();
  }

  /**
   * Exports the model and its expanded network to BioNetGen .net format.
   * @param model The parsed BNGL model containing parameters, observables, etc.
   * @param speciesList The list of concrete species generated during network expansion.
   * @param reactionList The list of concrete reactions generated during network expansion.
   * @returns A string in BioNetGen .net format.
   */
  static export(
    model: BNGLModel,
    speciesList: Species[],
    reactionList: Rxn[]
  ): string {
    let out = '# Created by BioNetGen Web Simulator\n';

    const normalizedReverse = new Map<string, Rxn>();
    const dedupedReactions: Rxn[] = [];
    for (const rxn of reactionList) {
      const name = rxn.name ?? '';
      const isReverse = name.startsWith('_reverse__');
      if (!isReverse) {
        dedupedReactions.push(rxn);
        continue;
      }

      const reactantsKey = rxn.reactants.slice().sort((a, b) => a - b).join(',');
      const productsKey = rxn.products.slice().sort((a, b) => a - b).join(',');
      const rateExprKey = (rxn.rateExpression ?? '').replace(/\s+/g, ' ').trim();
      const scaleKey = String((rxn as Rxn & { scalingVolume?: number }).scalingVolume ?? '');
      const key = `${reactantsKey}|${productsKey}|${rateExprKey}|${rxn.rate}|${scaleKey}`;

      if (normalizedReverse.has(key)) {
        continue;
      }

      normalizedReverse.set(key, rxn);
      dedupedReactions.push(rxn);
    }

    const sortedReactions = [...dedupedReactions].sort((a, b) => {
      const ra = a.reactants.slice().sort((x, y) => x - y).join(',');
      const rb = b.reactants.slice().sort((x, y) => x - y).join(',');
      if (ra !== rb) return ra.localeCompare(rb);
      const pa = a.products.slice().sort((x, y) => x - y).join(',');
      const pb = b.products.slice().sort((x, y) => x - y).join(',');
      if (pa !== pb) return pa.localeCompare(pb);
      const ea = (a.rateExpression ?? '').replace(/\s+/g, ' ').trim();
      const eb = (b.rateExpression ?? '').replace(/\s+/g, ' ').trim();
      if (ea !== eb) return ea.localeCompare(eb);
      return 0;
    });

    const generatedRateLaws: Array<{ name: string; expr: string; asFunction: boolean }> = [];
    let rateLawCounter = 1;

    const normalizeRateExpr = (rawExpr: string): { key: string; display: string } => {
      let expr = rawExpr.trim();

      while (expr.length >= 2 && expr.startsWith('(') && expr.endsWith(')')) {
        const inside = expr.substring(1, expr.length - 1).trim();
        let balance = 0;
        let isMatchingPair = true;
        for (let i = 0; i < inside.length; i++) {
          if (inside[i] === '(') balance++;
          if (inside[i] === ')') balance--;
          if (balance < 0) {
            isMatchingPair = false;
            break;
          }
        }
        if (isMatchingPair && balance === 0) {
          expr = inside;
        } else {
          break;
        }
      }

      return {
        key: expr.replace(/\s+/g, ''),
        display: expr
      };
    };

    // Helper to get or create a rate law parameter/function name
    const getRateLawName = (rawExpr: string) => {
      const normalized = normalizeRateExpr(rawExpr);
      const expr = normalized.display;
      if (!expr) {
        return expr;
      }

      // 1. If it's a parameter name already, use it directly
      if (model.parameters[expr] !== undefined) {
        return expr;
      }

      // 2. If it's a function name (possibly with ()), use it directly
      const funcName = expr.endsWith('()') ? expr.slice(0, -2) : expr;
      const isNamedFunc = model.functions?.some(f => f.name === funcName);
      if (isNamedFunc) {
        return funcName;
      }

      const name = `_rateLaw${rateLawCounter++}`;
      generatedRateLaws.push({
        name,
        expr,
        asFunction: this.requiresGeneratedFunction(expr, model)
      });
      return name;
    };

    const ruleRateLaws = new Map<number, { forward?: { key: string; name: string }; reverse?: { key: string; name: string } }>();

    // Pre-calculate generated _rateLawN naming in BNGL reaction-rule order,
    // assigning per rule occurrence (forward then reverse for bidirectional).
    (model.reactionRules ?? []).forEach((rule, idx) => {
      const ruleIndex = idx + 1;
      const entry: { forward?: { key: string; name: string }; reverse?: { key: string; name: string } } = {};

      const forwardExpr = rule.rateExpression ?? rule.rate;
      if (forwardExpr && forwardExpr.trim().length > 0) {
        const normalized = normalizeRateExpr(forwardExpr);
        entry.forward = { key: normalized.key, name: getRateLawName(forwardExpr) };
      }

      if (rule.isBidirectional) {
        const reverseExpr = rule.reverseRate ?? '';
        if (reverseExpr && reverseExpr.trim().length > 0) {
          const normalized = normalizeRateExpr(reverseExpr);
          entry.reverse = { key: normalized.key, name: getRateLawName(reverseExpr) };
        }
      }

      if (entry.forward || entry.reverse) {
        ruleRateLaws.set(ruleIndex, entry);
      }
    });

    const rxnRateNames = new WeakMap<Rxn, string>();
    dedupedReactions.forEach(rxn => {
      const expr = rxn.rateExpression || rxn.rate.toString();
      const normalizedExpr = normalizeRateExpr(expr).key;
      const name = rxn.name ?? '';
      const ruleMatch = name.match(/_R(\d+)/);
      const ruleIndex = ruleMatch ? Number.parseInt(ruleMatch[1], 10) : null;
      const isReverse = name.startsWith('_reverse__');

      if (ruleIndex !== null) {
        const mapped = ruleRateLaws.get(ruleIndex);
        const side = isReverse ? mapped?.reverse : mapped?.forward;
        if (side && side.key === normalizedExpr) {
          rxnRateNames.set(rxn, side.name);
          return;
        }
      }

      rxnRateNames.set(rxn, getRateLawName(expr));
    });

    // 1. Parameters
    out += 'begin parameters\n';
    let paramIdx = 1;
    for (const [name, value] of Object.entries(model.parameters)) {
      out += `    ${(paramIdx++).toString().padStart(5)} ${name.padEnd(16)} ${value}\n`;
    }

    // Add generated rate law constants (parameters)
    for (const rateLaw of generatedRateLaws) {
      if (rateLaw.asFunction) {
        continue;
      }
      out += `    ${(paramIdx++).toString().padStart(5)} ${rateLaw.name.padEnd(16)} ${rateLaw.expr}\n`;
    }
    out += 'end parameters\n';

    // 2. Functions
    out += 'begin functions\n';
    let funcIdx = 1;
    if (model.functions) {
      model.functions.forEach(fn => {
        const argsStr = fn.args.length > 0 ? `(${fn.args.join(',')})` : '()';
        out += `    ${(funcIdx++).toString().padStart(5)} ${fn.name}${argsStr} ${fn.expression}\n`;
      });
    }
    // Add generated rate law functions
    for (const rateLaw of generatedRateLaws) {
      if (rateLaw.asFunction) {
        out += `    ${(funcIdx++).toString().padStart(5)} ${rateLaw.name}() ${rateLaw.expr}\n`;
      }
    }
    out += 'end functions\n';

    // 3. Species
    out += 'begin species\n';
    speciesList.forEach((spec, i) => {
      const idx = i + 1;
      // Use canonical species strings so ordering/formatting is stable and
      // closer to BNG2 .net conventions (notably compartment prefixes).
      const name = GraphCanonicalizer.canonicalize(spec.graph);
      const conc = spec.concentration ?? spec.initialConcentration ?? 0;
      const prefix = (spec as Species & { isConstant?: boolean }).isConstant ? '$' : '';
      out += `    ${idx.toString().padStart(5)} ${(prefix + name).padEnd(30)} ${conc}\n`;
    });
    out += 'end species\n';

    // 4. Reactions
    out += 'begin reactions\n';
    const parameterMap = new Map<string, number>(Object.entries(model.parameters ?? {}).map(([k, v]) => [k, Number(v)]));
    sortedReactions.forEach((rxn, i) => {
      const idx = i + 1;
      const reactants = rxn.reactants.length > 0
        ? rxn.reactants.map(r => r + 1).join(',')
        : '0'; // BNG .net explicit null species
      const products = rxn.products.length > 0
        ? rxn.products.map(p => p + 1).join(',')
        : '0'; // BNG .net explicit null species

      const rateName = rxnRateNames.get(rxn) ?? (rxn.rateExpression || rxn.rate.toString());
      const baseRateExpr = (rxn.rateExpression ?? '').trim();

      // BNG2 .net stores multiplicative coefficients in reaction coefficients.
      // Reconstruct numeric prefix as: statFactor * unitFactor.
      const reactantOrder = rxn.reactants.length;
      const scalingVolume = (rxn as any).scalingVolume as number | undefined;
      const rateNameIsNumeric = Number.isFinite(Number(rateName));

      // Prefer deriving symbolic multiplicative factor directly from the
      // generated numeric reaction rate when the base rate token is evaluable.
      // This is robust against stale/inexact statFactor metadata on Rxn.
      let inferredStatFactor: number | null = null;
      if (!rateNameIsNumeric) {
        let baseRateValue = Number.NaN;

        if (baseRateExpr.length > 0) {
          try {
            baseRateValue = BNGLParser.evaluateExpression(baseRateExpr, parameterMap as any);
          } catch {
            baseRateValue = Number.NaN;
          }
        }

        if (!Number.isFinite(baseRateValue)) {
          try {
            baseRateValue = BNGLParser.evaluateExpression(rateName, parameterMap as any);
          } catch {
            baseRateValue = Number.NaN;
          }
        }

        if (Number.isFinite(baseRateValue) && Math.abs(baseRateValue) > 1e-15 && Number.isFinite(rxn.rate)) {
          const ratio = rxn.rate / baseRateValue;
          if (Number.isFinite(ratio) && Math.abs(ratio) > 1e-15) {
            inferredStatFactor = Number(ratio.toPrecision(12));
          }
        }
      }

      const statFactor = rateNameIsNumeric
        ? 1
        : (inferredStatFactor ?? (rxn.statFactor ?? 1));
      let unitFactor = 1;
      if (
        typeof scalingVolume === 'number' &&
        Number.isFinite(scalingVolume) &&
        scalingVolume > 0
      ) {
        if (reactantOrder === 0) {
          // Zero-order synthesis in compartment C scales as k * Volume(C).
          unitFactor = scalingVolume;
        } else if (reactantOrder > 1) {
          unitFactor = 1 / Math.pow(scalingVolume, reactantOrder - 1);
        }
      }

      const prefix = statFactor * unitFactor;
      const rateToken = Math.abs(prefix - 1) > 1e-15
        ? `${this.formatNumericFactor(prefix)}*${rateName}`
        : rateName;

      const ruleName = rxn.name ? ` #${rxn.name}` : '';
      out += `    ${idx.toString().padStart(5)} ${reactants.padEnd(10)} ${products.padEnd(10)} ${rateToken}${ruleName}\n`;
    });
    out += 'end reactions\n';

    // 5. Groups (Observables)
    if (model.observables && model.observables.length > 0) {
      out += 'begin groups\n';
      model.observables.forEach((obs, i) => {
        const idx = i + 1;
        const weights = this.calculateObservableWeights(obs, speciesList);
        if (weights.length > 0) {
          const weightStr = weights.map(w => (w.weight === 1 ? `${w.speciesIdx}` : `${w.weight}*${w.speciesIdx}`)).join(',');
          out += `    ${idx.toString().padStart(5)} ${obs.name.padEnd(20)} ${weightStr}\n`;
        } else {
          out += `    ${idx.toString().padStart(5)} ${obs.name.padEnd(20)}\n`;
        }
      });
      out += 'end groups\n';
    }

    return out;
  }

  private static containsObservables(expr: string, model: BNGLModel): boolean {
    if (!model.observables) return false;
    return model.observables.some(obs => {
      const regex = new RegExp(`\\b${obs.name}\\b`);
      return regex.test(expr);
    });
  }

  /**
   * Calculates the weights for each species in an observable group.
   */
  private static calculateObservableWeights(
    obs: BNGLObservable,
    speciesList: Species[]
  ): { speciesIdx: number; weight: number }[] {
    const weightsMap = new Map<number, number>();
    const obsType = (obs.type ?? '').toLowerCase();

    // Split multi-pattern observables on top-level commas only so component
    // lists like A(b,b!?) are preserved as one pattern.
    const patternStrings = this.splitObservablePatterns(obs.pattern);

    for (const patternStr of patternStrings) {
      try {
        const patternGraph = BNGLParser.parseSpeciesGraph(patternStr, true);
        speciesList.forEach((species, i) => {
          const speciesIdx = i + 1;
          const matches = GraphMatcher.findAllMaps(patternGraph, species.graph, {
            symmetryBreaking: false,
            allowExtraTargetBonds: false
          });
          const count = matches.reduce((total, match) => {
            return total + countEmbeddingDegeneracy(patternGraph, species.graph, match);
          }, 0);
          if (count > 0) {
            const weightToAdd = (obsType === 'species') ? 1 : count;
            weightsMap.set(speciesIdx, (weightsMap.get(speciesIdx) ?? 0) + weightToAdd);
          }
        });
      } catch (err) {
        console.warn(`[NetworkExporter] Failed to parse pattern '${patternStr}' for observable '${obs.name}':`, err);
      }
    }

    return Array.from(weightsMap.entries()).map(([speciesIdx, weight]) => ({
      speciesIdx,
      weight
    }));
  }
}
