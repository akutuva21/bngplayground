import type { ReactionRule } from '../../types';
import type { AtomRuleGraph, AREdge, ARNode } from '../../types/visualization';
import {
  extractAtoms,
  parseSpeciesGraphs,
} from './speciesGraphUtils';
import { getExpressionDependencies } from '../../src/parser/ExpressionDependencies';

interface AtomRuleGraphOptions {
  getRuleId?: (rule: ReactionRule, index: number) => string;
  getRuleLabel?: (rule: ReactionRule, index: number) => string;
  // Optional: all observables and functions to resolve regulatory dependencies
  observables?: Array<{ name: string; pattern: string }>;
  functions?: Array<{ name: string; expression: string }>;
  /**
   * Include rate‑law/regulatory dependencies. Web UI defaults to true for
   * convenience; turn off when comparing against BNG2.pl (“parity mode”).
   */
  includeRateLawDeps?: boolean;
  /**
   * Atomization strategy. 'standard' breaks species into component/state/bond
   * atoms (web default). 'bng2' keeps each reactant/product string intact,
   * matching the way BNG2.pl names atomic patterns.
   */
  atomization?: 'standard' | 'bng2';
}

/** prettify string the way BNG2.pl does: add spaces around arrows and commas. */
const prettify = (s: string): string => {
  let result = s;
  // BNG2.pl prettify only adds spaces around -> and ,
  if (result.includes('->')) {
    if (!/\s->\s/.test(result)) {
      result = result.split('->').map(p => prettify(p.trim())).join(' -> ');
    }
  }
  if (result.includes(',')) {
    if (!/\s,\s/.test(result)) {
      result = result.split(',').map(p => p.trim()).join(' , ');
    }
  }
  return result;
};

/**
 * Filter out patterns that contain "?" (wildcard) as they are suppressed in BNG2 graphs.
 */
const isSuppressed = (atomId: string): boolean => {
  return atomId.includes('~?') || atomId.includes('!?');
};

/**
 * Identify if a pattern is a bond wildcard (!+).
 */
const isWildcard = (atomId: string): boolean => {
  return atomId.includes('!+');
};

/**
 * Resolve wildcard edges by expanding Context edges to all matching concrete patterns.
 * This mirrors BNG2.pl's addWildcards + reprocessWildcards logic.
 */
const resolveWildcards = (
  nodes: ARNode[],
  edges: AREdge[],
): void => {
  const atomNodes = nodes.filter(n => n.type === 'atom');
  const wildcards = atomNodes.filter(n => isWildcard(n.id));
  const concrete = atomNodes.filter(n => !isWildcard(n.id) && !isSuppressed(n.id));

  // 1. Add 'wildcard' type edges from wildcard patterns to matching concrete patterns
  wildcards.forEach(wc => {
    const searchStr = wc.id.split('+')[0]; // e.g., "A(x!+)" -> "A(x!"
    concrete.forEach(con => {
      if (con.id.includes(searchStr)) {
        edges.push({
          from: wc.id,
          to: con.id,
          edgeType: 'wildcard',
        });
      }
    });
  });

  // 2. Expand 'modifies' (Context) edges involving wildcards
  const wcIds = new Set(wildcards.map(w => w.id));
  const newEdges: AREdge[] = [];
  const edgesToRemove = new Set<number>();

  edges.forEach((edge, idx) => {
    // In our graph, Context edges are atom -> rule (modifies)
    if (edge.edgeType === 'modifies' && wcIds.has(edge.from)) {
      // Find matches: WC -> CON
      const matches = edges.filter(e => e.edgeType === 'wildcard' && e.from === edge.from);
      matches.forEach(m => {
        newEdges.push({
          from: m.to, // Con
          to: edge.to, // Rule
          edgeType: 'modifies',
        });
      });
      edgesToRemove.add(idx);
    }
  });

  // Filter out removed edges and add new expanded ones
  // We also remove the 'wildcard' helper edges themselves at the end
  const filteredEdges = edges.filter((e, idx) => !edgesToRemove.has(idx) && e.edgeType !== 'wildcard').concat(newEdges);
  edges.length = 0;
  edges.push(...filteredEdges);

  // 3. Remove wildcard nodes – they were used to expand influence but shouldn't appear
  const finalNodes = nodes.filter(n => !wcIds.has(n.id));
  nodes.length = 0;
  nodes.push(...finalNodes);
};

const ensureAtomNode = (
  atomId: string,
  nodes: ARNode[],
  atomSet: Set<string>,
  formatLabel: (id: string) => string,
): void => {
  if (isSuppressed(atomId)) return;
  if (atomSet.has(atomId)) {
    return;
  }
  atomSet.add(atomId);
  nodes.push({
    id: atomId,
    type: 'atom',
    label: formatLabel(atomId),
  });
};

const addEdge = (
  from: string,
  to: string,
  edgeType: AREdge['edgeType'],
  edges: AREdge[],
  edgeSet: Set<string>,
): void => {
  if (isSuppressed(from) || isSuppressed(to)) return;
  const key = `${from}->${to}:${edgeType}`;
  if (edgeSet.has(key)) {
    return;
  }
  edgeSet.add(key);
  edges.push({
    from,
    to,
    edgeType,
  });
};

/**
 * Identify species used in an expression, expanding observables and functions as needed.
 */
const getSpeciesDependencies = (
  expression: string,
  observables: Array<{ name: string; pattern: string }> = [],
  functions: Array<{ name: string; expression: string }> = [],
): Set<string> => {
  const deps = getExpressionDependencies(expression);
  const speciesDeps = new Set<string>();

  const obsMap = new Map(observables.map(o => [o.name, o.pattern]));
  const funcMap = new Map(functions.map(f => [f.name, f.expression]));
  const seenIds = new Set<string>();

  const resolve = (id: string) => {
    if (seenIds.has(id)) return;
    seenIds.add(id);

    if (obsMap.has(id)) {
      const pattern = obsMap.get(id)!;
      // Pattern might be a comma-separated list of species patterns
      const speciesInPattern = pattern.split(',').map(s => s.trim().split('(')[0].trim());
      speciesInPattern.forEach(s => { if (s) speciesDeps.add(s); });
    } else if (funcMap.has(id)) {
      const funcExpr = funcMap.get(id)!;
      const subDeps = getExpressionDependencies(funcExpr);
      subDeps.forEach(resolve);
    } else {
      // It might be a direct species name or a parameter
      // Standard BNG regulatory graphs treat external symbols as species nodes.
      if (id) speciesDeps.add(id);
    }
  };

  deps.forEach(resolve);
  return speciesDeps;
};

export const buildAtomRuleGraph = (
  rules: ReactionRule[],
  options: AtomRuleGraphOptions = {},
): AtomRuleGraph => {
  const nodes: ARNode[] = [];
  const edges: AREdge[] = [];
  const atomIds = new Set<string>();
  const edgeIds = new Set<string>();

  // choose formatting strategy depending on atomization option
  const formatLabel = (atomId: string): string => {
    // When using BNG2 atomization we want the original species string to
    // appear exactly; skip prettification except for bond nodes which still
    // need whitespace around the dash for readability.  We also preserve the
    // "bond:" stripping logic as before.
    const skipPretty = options.atomization === 'bng2' && !atomId.startsWith('bond:');

    let cleanId = atomId.startsWith('bond:') ? atomId.substring(5) : atomId;

    if (cleanId.includes('|')) {
      // bond endpointals should still be prettified even in BNG2 mode
      const [leftRaw, rightRaw] = cleanId.split('|');
      const formatEndpoint = (endpoint: string): string => endpoint.replace(':', '.');
      const label = `${formatEndpoint(leftRaw)} — ${formatEndpoint(rightRaw ?? '')}`;
      return skipPretty ? label : prettify(label);
    }

    return skipPretty ? cleanId : prettify(cleanId);
  };

  // Pass 2: Process rules
  rules.forEach((rule, index) => {
    // rule ID/label – mirror BNG2.pl behavior for names beginning with digits
    let ruleId = options.getRuleId?.(rule, index) ?? rule.name ?? `rule_${index + 1}`;
    if (/^[0-9]/.test(ruleId)) {
      ruleId = `_${ruleId}`;
    }
    const ruleLabel = options.getRuleLabel?.(rule, index) ?? rule.name ?? `Rule ${index + 1}`;
    nodes.push({
      id: ruleId,
      type: 'rule',
      label: prettify(ruleLabel),
    });

    // 1. Structural dependencies (reactants/products)
    let reactantGraphs = [];
    let productGraphs = [];
    
    try {
      reactantGraphs = parseSpeciesGraphs(rule.reactants);
      productGraphs = parseSpeciesGraphs(rule.products);
    } catch (e) {
      console.warn(`[buildAtomRuleGraph] Failed to parse rule ${ruleId} graphs:`, e);
    }

    let reactantAtoms: Set<string>;
    let productAtoms: Set<string>;
    if (options.atomization === 'bng2') {
      // give back whole species strings exactly as parsed (graph.toString())
      reactantAtoms = new Set(reactantGraphs.map(g => g.toString()));
      productAtoms = new Set(productGraphs.map(g => g.toString()));
    } else {
      reactantAtoms = extractAtoms(reactantGraphs);
      productAtoms = extractAtoms(productGraphs);
    }

    reactantAtoms.forEach((atom) => {
      ensureAtomNode(atom, nodes, atomIds, formatLabel);
      if (productAtoms.has(atom)) {
        // atom present on both sides -> context edge (unchanged)
        addEdge(atom, ruleId, 'modifies', edges, edgeIds);
      } else {
        addEdge(atom, ruleId, 'consumes', edges, edgeIds);
      }
    });

    productAtoms.forEach((atom) => {
      ensureAtomNode(atom, nodes, atomIds, formatLabel);
      if (!reactantAtoms.has(atom)) {
        addEdge(ruleId, atom, 'produces', edges, edgeIds);
      }
    });

    // 2. Functional/Regulatory dependencies (rate laws) — opt-in
    if (options.includeRateLawDeps !== false) {
      const allDepSpecies = new Set<string>();
      if (rule.rate) {
        getSpeciesDependencies(rule.rate, options.observables, options.functions).forEach(s => allDepSpecies.add(s));
      }
      // Bidirectional rules
      const rateExpressions = rule.reverseRate ? [rule.rate, rule.reverseRate] : [rule.rate];
      
      allDepSpecies.forEach(speciesName => {
        // Only draw functional arrow if it's NOT already a consumed/produced/modified atom
        // AND it doesn't look like a keyword/primitive
        if (speciesName && 
            !reactantAtoms.has(speciesName) && 
            !productAtoms.has(speciesName) &&
            !['time', 'e', 'pi'].includes(speciesName.toLowerCase())) {
           
           // Standard: context dependency is a 'modifies' arrow (gray)
           ensureAtomNode(speciesName, nodes, atomIds, formatLabel);
           addEdge(speciesName, ruleId, 'modifies', edges, edgeIds);
        }
      });
    }
  });

  // Pass 3: Resolve Wildcards (!+)
  // This mirrors BNG2.pl's addWildcards + reprocessWildcards logic for Process Graphs.
  if (options.atomization === 'bng2') {
    resolveWildcards(nodes, edges);
  }

  return {
    nodes,
    edges,
  };
};
