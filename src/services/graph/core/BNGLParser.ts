import { Component } from './Component.ts';
import { Molecule } from './Molecule.ts';
import { SpeciesGraph } from './SpeciesGraph.ts';

import { evaluateExpressionHighPrecision, needsHighPrecision } from './highPrecisionEvaluator';
import { RxnRule } from './RxnRule.ts';

const shouldLogParser = false;


/**
 * Parser for BNGL strings to graph structures
 * Mirrors BioNetGen parsing logic
 */
export class BNGLParser {
  /**
   * Parse a BNGL species string into SpeciesGraph
   * Example: "A(b!1).B(a!1)" -> SpeciesGraph with two molecules connected by bond 1
   */
  static parseSpeciesGraph(bnglString: string, resolveBonds: boolean = true): SpeciesGraph {
    const graph = new SpeciesGraph();

    if (!bnglString.trim()) return graph;

    // Handle global compartment prefix like @nuc:A.B
    let globalCompartment: string | undefined;
    let content = bnglString.trim();

    // Support both single colon (Web) and double colon (BNG2) separators
    // e.g. @cell:Species or @cell::Species
    const prefixMatch = content.match(/^@([A-Za-z0-9_]+):(:?)(.+)$/);
    if (prefixMatch) {
      globalCompartment = prefixMatch[1];
      content = prefixMatch[3]; // Group 3 is the content after :: or :
      graph.compartment = globalCompartment;
    }

    // Handle suffix compartment notation like R(l,tf~Y)@PM (after last closing paren)
    // This is common in cBNGL models
    if (!globalCompartment) {
      const suffixMatch = content.match(/^(.+\))@([A-Za-z0-9_]+)$/);
      if (suffixMatch) {
        globalCompartment = suffixMatch[2];
        content = suffixMatch[1];
        graph.compartment = globalCompartment;
      }
    }

    // Handle suffix compartment notation for single-molecule species WITHOUT parentheses,
    // e.g. "mRNA@NU" or "mRNA@CP" (common in cBNGL). Normalize to "mRNA()".
    // Without this, "mRNA@NU" and "mRNA()@NU" produce different graphs and break
    // reactions like transport/translation.
    if (!globalCompartment) {
      const bareSuffixMatch = content.match(/^([A-Za-z_][A-Za-z0-9_]*)@([A-Za-z0-9_]+)$/);
      if (bareSuffixMatch) {
        globalCompartment = bareSuffixMatch[2];
        content = `${bareSuffixMatch[1]}()`;
        graph.compartment = globalCompartment;
      }
    }

    // Helper to split by dot outside parentheses
    const splitMolecules = (str: string) => {
      const parts: string[] = [];
      let current = '';
      let depth = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '(') depth++;
        else if (char === ')') depth--;
        else if (char === '.' && depth === 0) {
          parts.push(current);
          current = '';
          continue;
        }
        current += char;
      }
      if (current) parts.push(current);
      return parts;
    };

    const moleculeStrings = splitMolecules(content);

    for (const molStr of moleculeStrings) {
      const molecule = this.parseMolecule(molStr.trim());
      // BNG2 semantics for graph-level compartment prefix (e.g., @CYT:A(b!1).B(a!1)):
      // - When a graph-level compartment is specified, ALL molecules in the pattern
      //   that don't have their own explicit compartment annotation inherit it.
      // - This is different from molecule-level suffix (e.g., A(b!1)@CYT.B(a!1))
      //   which only applies to that specific molecule.
      // 
      // Example patterns:
      //   @O1V:A(t,b!1).B(a!1)  -> Both A and B are in O1V
      //   A(t,b!1)@O1V.B(a!1)   -> Only A is in O1V, B has no compartment constraint
      //
      // This ensures rules like "@O1V:A(t,b!1).B(a!1) + T1(a)" only match
      // A.B complexes that are actually in O1V, not in other compartments like CYT.
      if (!molecule.compartment && globalCompartment) {
        molecule.compartment = globalCompartment;
      }
      graph.molecules.push(molecule);
    }

    // Resolve bonds: connect components with same bond label
    if (resolveBonds) {
      const bondMap = new Map<number, { molIdx: number; compIdx: number }[]>();
      graph.molecules.forEach((mol, molIdx) => {
        mol.components.forEach((comp, compIdx) => {
          for (const bond of comp.edges.keys()) {
            if (!bondMap.has(bond)) bondMap.set(bond, []);
            bondMap.get(bond)!.push({ molIdx, compIdx });
          }
        });
      });

      bondMap.forEach((partners, label) => {
        if (partners.length === 2) {
          const [p1, p2] = partners;
          if (shouldLogParser) {
            // console.log(`[BNGLParser] Adding bond ${label} between ${p1.molIdx}.${p1.compIdx} and ${p2.molIdx}.${p2.compIdx}`);
          }
          graph.addBond(p1.molIdx, p1.compIdx, p2.molIdx, p2.compIdx, label);
        } else {
          if (shouldLogParser) {
            console.warn(`[BNGLParser] Bond ${label} has ${partners.length} partners (expected 2) in string: ${bnglString}`);
          }
        }
      });
    }

    return graph;
  }

  /**
   * Parse a BNGL molecule string
   * Example: "A(b!1,c~P)" -> Molecule with name A, components b (bonded) and c (phosphorylated)
   * Also handles "@comp:Name", "Name@comp", and tags "Name%1"
   */
  static parseMolecule(molStr: string): Molecule {
    if (shouldLogParser && molStr.includes('!+')) console.log(`[BNGLParser] parseMolecule input: '${molStr}'`);
    // Check for prefix notation: @comp:Name...
    let compartment: string | undefined;
    let cleanStr = molStr;

    // Support both single colon (Web) and double colon (BNG2/canonical) separators
    // e.g. @cell:Mol(...) or @cell::Mol(...)
    const prefixMatch = molStr.match(/^@([A-Za-z0-9_]+)::?(.+)$/);
    if (prefixMatch) {
      compartment = prefixMatch[1];
      cleanStr = prefixMatch[2];
    }

    // Check for suffix notation: Name@comp
    // Be careful not to match inside parentheses
    const suffixMatch = cleanStr.match(/^([^\(]+)@([A-Za-z0-9_]+)(\(.*\))?$/);
    if (suffixMatch) {
      // This regex is simplistic, might need robustness
      // Actually, standard BNGL puts compartment after name before parens? Or after parens?
      // "A@cyt(b)" or "A(b)@cyt"? BioNetGen usually "A@cyt(b)".
      // Let's stick to the simpler regex for now:
    }

    // Parse name and components
    const match = cleanStr.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*(?:\(([^)]*)\))?(?:@([A-Za-z0-9_]+))?\s*$/);
    if (!match) {
      // Molecule without components, e.g., "A"
      return new Molecule(cleanStr, [], compartment);
    }

    const name = match[1];
    const componentStr = match[2] || '';
    const suffixCompartment = match[3];

    if (suffixCompartment) {
      compartment = suffixCompartment;
    }

    if (!componentStr.trim()) {
      return new Molecule(name, [], compartment, true);
    }

    const components: Component[] = [];
    const compStrings = componentStr.split(',');

    for (const compStr of compStrings) {
      const trimmed = compStr.trim();
      // Skip empty component strings (e.g., from double commas like "a,,b")
      if (!trimmed) continue;
      const component = this.parseComponent(trimmed);
      components.push(component);
    }

    return new Molecule(name, components, compartment);
  }

  /**
   * Parse a BNGL component string
   * Examples: "b!1" (bonded), "c~P" (state), "d" (unbound), "x!1!2" (multi-bonded)
   */
  static parseComponent(compStr: string): Component {
    const parts = compStr.split('!');
    const nameAndStates = parts[0].trim();
    const bondParts = parts.slice(1); // ALL bond parts, not just the first one
    const stateParts = nameAndStates.split('~');
    const name = stateParts[0];
    const states = stateParts.slice(1);
    const component = new Component(name, states);
    if (states.length > 0) component.state = states[0];

    // Handle ALL bonds (for multi-site bonding like !1!2)
    for (const bondPart of bondParts) {
      if (bondPart === '+' || bondPart === '?' || bondPart === '-') {
        component.wildcard = bondPart;
      } else {
        const bond = parseInt(bondPart);
        if (!isNaN(bond)) {
          component.edges.set(bond, -1);
        }
      }
    }
    if (compStr.includes('!+')) {
      if (shouldLogParser) console.log(`[BNGLParser] Parsing component '${compStr}': wildcard='${component.wildcard}'`);
    }
    return component;
  }

  /**
   * Parse a BNGL reaction rule string into RxnRule
   * Example: "A(b) + B(a) -> A(b!1).B(a!1)"
   * Also handles synthesis rules: "0 -> A()" or "" -> A()
   * Also handles degradation rules: "A() -> 0"
   */
  static parseRxnRule(ruleStr: string, rateConstant: number | string, name?: string): RxnRule {
    // Detect arrow robustly (->, <-, <->, ~>) and split around the first arrow
    const arrowRegex = /(?:<->|->|<-|~>)/;
    const arrowMatch = ruleStr.match(arrowRegex);
    if (!arrowMatch) throw new Error(`Invalid rule (no arrow found): ${ruleStr}`);
    const parts = ruleStr.split(arrowRegex).map(p => p.trim());
    // Filter but keep track of empty strings for synthesis rules
    const nonEmpty = parts.filter(Boolean);
    if (nonEmpty.length < 1) throw new Error(`Invalid rule: ${ruleStr}`);

    const reactantsStr = parts[0] || '';
    const productsStr = parts.slice(1).join(' ').trim();

    // parseEntityList: split top-level entities by '+' respecting parentheses depth
    const parseEntityList = (segment: string) => {
      if (!segment || !segment.trim()) return [] as string[];

      const parts: string[] = [];
      let current = '';
      let depth = 0;

      for (let i = 0; i < segment.length; i++) {
        const char = segment[i];

        if (char === '(') {
          depth++;
          current += char;
        } else if (char === ')') {
          depth--;
          current += char;
        } else if (depth === 0 && char === '+') {
          // Split on + at top level
          if (current.trim()) parts.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      if (current.trim()) parts.push(current.trim());

      return parts;
    };

    // Handle synthesis rules: "0 -> X" means empty reactants
    let reactantsList = parseEntityList(reactantsStr);
    if (reactantsList.length === 1 && reactantsList[0] === '0') {
      reactantsList = [];
    }

    // Handle degradation rules: "X -> 0" means empty products
    let productsList = parseEntityList(productsStr);
    if (productsList.length === 1 && productsList[0] === '0') {
      productsList = [];
    }

    if (shouldLogParser && reactantsStr.includes('!+')) {
      console.log(`[BNGLParser] parseRxnRule reactantsStr: '${reactantsStr}'`);
      console.log(`[BNGLParser] parseEntityList result:`, JSON.stringify(reactantsList));
    }
    const reactants = reactantsList.map(s => this.parseSpeciesGraph(s.trim(), true));
    const products = productsList.map(s => this.parseSpeciesGraph(s.trim(), true));

    let rateNum: number;
    let rateExpr: string | undefined;

    if (typeof rateConstant === 'number') {
      rateNum = rateConstant;
    } else {
      // It's a string
      const parsed = parseFloat(rateConstant);
      if (!isNaN(parsed) && isFinite(parsed) && !rateConstant.match(/[a-zA-Z_]/)) {
        rateNum = parsed;
      } else {
        rateNum = 0; // Or NaN? 0 allows simulation to proceed (rate expression used instead)
        rateExpr = rateConstant;
      }
    }

    return new RxnRule(name || '', reactants, products, rateNum, { rateExpression: rateExpr });
  }

  /**
   * Convert SpeciesGraph back to BNGL string
   */
  static speciesGraphToString(graph: SpeciesGraph): string {
    return graph.toString();
  }

  /**
   * Convert RxnRule back to BNGL string
   */
  static rxnRuleToString(rule: RxnRule): string {
    const reactants = rule.reactants.map(r => this.speciesGraphToString(r)).join(' + ');
    const products = rule.products.map(p => this.speciesGraphToString(p)).join(' + ');
    return `${reactants} -> ${products}`;
  }

  /**
   * BioNetGen special function: mratio(a, b, z)
   * Computes M(a+1,b+1,z) / M(a,b,z) where M is Kummer's confluent hypergeometric function.
   * Used in parameter expressions for models with hypergeometric kinetics.
   */
  static mratio(a: number, b: number, z: number): number {
    const eps = 1e-16; // Convergence tolerance
    const tiny = 1e-32; // Small number to prevent division by zero

    let f = tiny;
    let C = f;
    let D = 0.0;
    let err = 1.0 + eps;

    let odd = 1;
    let even = 0;
    let iodd = 0;
    let ieven = 0;
    let j = 0;

    while (err > eps && j < 10000) { // Add iteration limit for safety
      j++;

      let p: number;
      if (j === 1) {
        p = 1.0;
      } else {
        const den = (b + (j - 2)) * (b + (j - 1));
        let num: number;
        if (odd === 1) {
          iodd++;
          num = z * (a + iodd);
        } else if (even === 1) {
          ieven++;
          num = z * (a - (b + ieven - 1));
        } else {
          throw new Error(`mratio: invalid state iodd=${iodd}, ieven=${ieven}`);
        }
        p = num / den;
      }

      const q = 1.0;

      D = q + p * D;
      if (Math.abs(D) < tiny) D = tiny;
      C = q + p / C;
      if (Math.abs(C) < tiny) C = tiny;
      D = 1.0 / D;

      const Delta = C * D;
      f = Delta * f;

      err = Math.abs(Delta - 1.0);

      // Swap odd/even for next iteration
      const tmp = odd;
      odd = even;
      even = tmp;
    }

    return f;
  }

  /**
   * Parse seed species block and evaluate expressions
   */
  static parseSeedSpecies(block: string, parameters: Map<string, number>): Map<string, number> {
    const seed = new Map<string, number>();
    for (const raw of block.split('\n')) {
      const line = raw.split('#')[0].trim();
      if (!line) continue;

      // Handle format: [index] [label:] species_pattern concentration_expression
      // The species pattern is a BNGL molecule pattern (contains letters, digits, parens, dots, bangs, tildes, underscores)
      // The concentration expression follows and can contain spaces (e.g., "a + b", "func(x)")

      // First, skip optional leading index (pure digits)
      let remaining = line;
      const leadingMatch = remaining.match(/^(\d+)\s+/);
      if (leadingMatch) {
        remaining = remaining.slice(leadingMatch[0].length);
      }

      // Skip optional label (ends with colon)
      const labelMatch = remaining.match(/^(\S+:)\s+/);
      if (labelMatch) {
        remaining = remaining.slice(labelMatch[0].length);
      }

      // Now we have: species_pattern concentration_expression
      // The species pattern is a contiguous BNGL pattern (no spaces)
      // It ends at the first whitespace, then the rest is the concentration expression
      const firstSpace = remaining.search(/\s/);
      if (firstSpace === -1) continue;  // No concentration specified

      const speciesStr = remaining.slice(0, firstSpace);
      const concentrationStr = remaining.slice(firstSpace).trim();

      if (!speciesStr || !concentrationStr) continue;

      const amt = this.evaluateExpression(concentrationStr, parameters);
      seed.set(speciesStr, amt);
    }
    return seed;
  }

  /**
   * Evaluate mathematical expressions with parameter substitution
   * @param expr - The expression to evaluate
   * @param parameters - Map of parameter names to values
   * @param observables - Optional map of observable names (for validation, uses placeholder values)
   * @returns The evaluated number, or NaN if evaluation fails or expression is invalid
   */
  static evaluateExpression(
    expr: string,
    parameters: Map<string, number>,
    observables?: Map<string, number> | Set<string>,
    functions?: Map<string, { args: string[], expr: string }>
  ): number {
    try {
      // Return NaN for empty or whitespace-only expressions
      if (!expr || expr.trim() === '') {
        return NaN;
      }

      // Check if we need high-precision evaluation (e.g. for Repressilator parameters)
      // Only use if extreme values are present to avoid overhead
      if (needsHighPrecision(parameters)) {
        // Construct combined parameter map including observables as 1.0
        let evalParams = parameters;
        if (observables) {
          evalParams = new Map(parameters);
          const obsNames = observables instanceof Set
            ? Array.from(observables)
            : Array.from(observables.keys());

          for (const obs of obsNames) {
            evalParams.set(obs, 1.0);
          }
        }

        const result = evaluateExpressionHighPrecision(expr, evalParams);
        if (!isNaN(result)) {
          return result;
        }
        // If high precision fails (e.g. unknown function), fall back to standard
      }

      // Replace parameter names with values
      let evaluable = expr;

      // Sort parameters by length (longest first) to avoid partial replacements
      const sortedParams = Array.from(parameters.entries()).sort((a, b) => b[0].length - a[0].length);

      for (const [name, value] of sortedParams) {
        // Use word boundary but allow underscores - escape special regex chars
        const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedName}\\b`, 'g');
        // Wrap negative numbers and NaN in parentheses to avoid syntax errors
        // e.g., -a becomes -(-1000) not --1000, and NaN expressions fail gracefully
        const valueStr = (value < 0 || isNaN(value)) ? `(${value})` : value.toString();
        evaluable = evaluable.replace(regex, valueStr);
      }

      // If observables are provided, replace observable names with placeholder values (1)
      // This allows rate expressions with observables to validate syntactically
      if (observables) {
        const obsNames = observables instanceof Set
          ? Array.from(observables)
          : Array.from(observables.keys());

        // Sort by length (longest first)
        obsNames.sort((a, b) => b.length - a.length);

        for (const name of obsNames) {
          const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          // Match observable name, optionally followed by ()
          const regex = new RegExp(`\\b${escapedName}\\b(?:\\s*\\(\\s*\\))?`, 'g');
          // Use 1 as placeholder to avoid division by zero issues
          evaluable = evaluable.replace(regex, '1');
        }
      }

      // Convert BNGL operators to JavaScript
      evaluable = evaluable.replace(/\^/g, '**');  // Power operator

      // Replace BNGL math constants
      evaluable = evaluable.replace(/\b_pi\b/g, String(Math.PI));
      evaluable = evaluable.replace(/\b_e\b/g, String(Math.E));

      // BNGL math functions with JavaScript equivalents
      evaluable = evaluable.replace(/\bexp\(/g, 'Math.exp(');
      evaluable = evaluable.replace(/\bln\(/g, 'Math.log(');
      evaluable = evaluable.replace(/\blog10\(/g, 'Math.log10(');
      evaluable = evaluable.replace(/\bsqrt\(/g, 'Math.sqrt(');
      evaluable = evaluable.replace(/\babs\(/g, 'Math.abs(');
      evaluable = evaluable.replace(/\bsin\(/g, 'Math.sin(');
      evaluable = evaluable.replace(/\bcos\(/g, 'Math.cos(');
      evaluable = evaluable.replace(/\btan\(/g, 'Math.tan(');
      evaluable = evaluable.replace(/\basin\(/g, 'Math.asin(');
      evaluable = evaluable.replace(/\bacos\(/g, 'Math.acos(');
      evaluable = evaluable.replace(/\batan\(/g, 'Math.atan(');
      evaluable = evaluable.replace(/\batan2\(/g, 'Math.atan2(');
      evaluable = evaluable.replace(/\bpow\(/g, 'Math.pow(');
      evaluable = evaluable.replace(/\bmin\(/g, 'Math.min(');
      evaluable = evaluable.replace(/\bmax\(/g, 'Math.max(');
      evaluable = evaluable.replace(/\bfloor\(/g, 'Math.floor(');
      evaluable = evaluable.replace(/\bceil\(/g, 'Math.ceil(');

      // Check if mratio or if is used
      const usesMratio = /\bmratio\s*\(/g.test(evaluable);
      const usesIf = /\bif\s*\(/g.test(evaluable);
      let needsHP = usesIf || usesMratio;

      // Also check if any custom function is used
      if (functions) {
        for (const fname of functions.keys()) {
           // Regex to check if fname( is in expression
           // Escape fname
           const escaped = fname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
           if (new RegExp(`\\b${escaped}\\s*\\(`, 'g').test(evaluable)) {
             needsHP = true;
             break;
           }
        }
      }

      if (needsHP) {
        // Force high precision evaluator (ANTLR-based) for these complex functions
        let evalParams = parameters;
        if (observables) {
          evalParams = new Map(parameters);
          const obsNames = observables instanceof Set
            ? Array.from(observables)
            : Array.from(observables.keys());

          for (const obs of obsNames) {
            evalParams.set(obs, 1.0);
          }
        }
        return evaluateExpressionHighPrecision(expr, evalParams, functions);
      }

      // Use Function constructor for safe evaluation
      const result = new Function(`return ${evaluable}`)();
      return typeof result === 'number' && !isNaN(result) ? result : NaN;
    } catch (e) {
      console.error(`[evaluateExpression] Failed to evaluate: "${expr}"`, e);
      return NaN;
    }
  }
}