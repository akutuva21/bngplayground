/**
 * NetworkAnalysis.ts - Reaction network structural analysis
 * 
 * Inspired by Catalyst.jl's network_analysis module.
 * Provides:
 * - Linkage class detection
 * - Deficiency calculation
 * - Reversibility analysis
 * - Complexity/species classification
 */

import type { Rxn } from './graph/core/Rxn';

/**
 * A reaction complex (node in the reaction graph)
 */
export interface Complex {
  id: number;
  /** Species indices with their stoichiometric coefficients */
  composition: Map<number, number>;
  /** String representation */
  repr: string;
}

/**
 * Network analysis results
 */
export interface NetworkAnalysis {
  /** Number of species */
  numSpecies: number;
  /** Number of reactions */
  numReactions: number;
  /** Unique complexes in the network */
  complexes: Complex[];
  /** Number of complexes */
  numComplexes: number;
  /** Linkage classes (connected components) */
  linkageClasses: number[][];
  /** Number of linkage classes */
  numLinkageClasses: number;
  /** Deficiency (δ = n - l - s) */
  deficiency: number;
  /** Rank of stoichiometric matrix */
  stoichiometricRank: number;
  /** Whether network is weakly reversible */
  isWeaklyReversible: boolean;
  /** Whether all reactions have reverse */
  isReversible: boolean;
  /** Boundary species (appear only as reactants or only as products) */
  boundarySpecies: number[];
  /** Floating species (appear both as reactants and products) */
  floatingSpecies: number[];
}

/**
 * Parse complex from reactants/products list
 */
function parseComplex(speciesIndices: number[]): Map<number, number> {
  const comp = new Map<number, number>();
  for (const s of speciesIndices) {
    comp.set(s, (comp.get(s) || 0) + 1);
  }
  return comp;
}

/**
 * Convert complex to canonical string for comparison
 */
function complexToString(comp: Map<number, number>): string {
  if (comp.size === 0) return '0'; // Empty complex (source/sink)
  const parts: string[] = [];
  const sorted = Array.from(comp.entries()).sort((a, b) => a[0] - b[0]);
  for (const [species, count] of sorted) {
    if (count === 1) {
      parts.push(`S${species}`);
    } else {
      parts.push(`${count}*S${species}`);
    }
  }
  return parts.join(' + ');
}

/**
 * Find unique complexes in the reaction network
 */
function findComplexes(reactions: Rxn[]): Complex[] {
  const complexMap = new Map<string, Complex>();
  let nextId = 0;
  
  for (const rxn of reactions) {
    // Source complex (reactants)
    const sourceComp = parseComplex(rxn.reactants);
    const sourceStr = complexToString(sourceComp);
    if (!complexMap.has(sourceStr)) {
      complexMap.set(sourceStr, { id: nextId++, composition: sourceComp, repr: sourceStr });
    }
    
    // Product complex
    const prodComp = parseComplex(rxn.products);
    const prodStr = complexToString(prodComp);
    if (!complexMap.has(prodStr)) {
      complexMap.set(prodStr, { id: nextId++, composition: prodComp, repr: prodStr });
    }
  }
  
  return Array.from(complexMap.values());
}

/**
 * Build adjacency list for complex graph
 */
function buildComplexGraph(
  reactions: Rxn[],
  complexes: Complex[]
): Map<number, Set<number>> {
  const strToId = new Map<string, number>();
  for (const c of complexes) {
    strToId.set(c.repr, c.id);
  }
  
  const graph = new Map<number, Set<number>>();
  for (const c of complexes) {
    graph.set(c.id, new Set());
  }
  
  for (const rxn of reactions) {
    const sourceStr = complexToString(parseComplex(rxn.reactants));
    const prodStr = complexToString(parseComplex(rxn.products));
    const sourceId = strToId.get(sourceStr)!;
    const prodId = strToId.get(prodStr)!;
    
    graph.get(sourceId)!.add(prodId);
  }
  
  return graph;
}

/**
 * Find connected components (linkage classes) using DFS
 */
function findLinkageClasses(
  complexes: Complex[],
  graph: Map<number, Set<number>>
): number[][] {
  const n = complexes.length;
  const visited = new Set<number>();
  const classes: number[][] = [];
  
  // Build undirected graph for weak connectivity
  const undirected = new Map<number, Set<number>>();
  for (let i = 0; i < n; i++) {
    undirected.set(i, new Set());
  }
  for (const [from, toSet] of graph) {
    for (const to of toSet) {
      undirected.get(from)!.add(to);
      undirected.get(to)!.add(from);
    }
  }
  
  for (let start = 0; start < n; start++) {
    if (visited.has(start)) continue;
    
    const component: number[] = [];
    const stack = [start];
    
    while (stack.length > 0) {
      const node = stack.pop()!;
      if (visited.has(node)) continue;
      visited.add(node);
      component.push(node);
      
      for (const neighbor of undirected.get(node)!) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
    
    classes.push(component.sort((a, b) => a - b));
  }
  
  return classes;
}

/**
 * Check if network is weakly reversible
 * (Every complex is reachable from every other in its linkage class)
 */
function checkWeaklyReversible(
  graph: Map<number, Set<number>>,
  linkageClasses: number[][]
): boolean {
  for (const linkageClass of linkageClasses) {
    if (linkageClass.length <= 1) continue;
    
    // Check that every node can reach every other node
    for (const start of linkageClass) {
      const reachable = new Set<number>();
      const stack = [start];
      
      while (stack.length > 0) {
        const node = stack.pop()!;
        if (reachable.has(node)) continue;
        reachable.add(node);
        
        for (const neighbor of graph.get(node)!) {
          if (!reachable.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
      
      // Check if all nodes in linkage class are reachable
      for (const target of linkageClass) {
        if (!reachable.has(target)) {
          return false;
        }
      }
    }
  }
  
  return true;
}

/**
 * Compute rank of stoichiometric matrix using Gaussian elimination
 */
function computeStoichiometricRank(reactions: Rxn[], nSpecies: number): number {
  if (reactions.length === 0 || nSpecies === 0) return 0;
  
  // Build stoichiometric matrix
  const N: number[][] = Array.from(
    { length: nSpecies },
    () => Array(reactions.length).fill(0)
  );
  
  for (let r = 0; r < reactions.length; r++) {
    const rxn = reactions[r];
    for (const s of rxn.reactants) N[s][r] -= 1;
    for (const s of rxn.products) N[s][r] += 1;
  }
  
  // Gaussian elimination
  const EPS = 1e-10;
  let rank = 0;
  const nRows = nSpecies;
  const nCols = reactions.length;
  
  let pivotRow = 0;
  for (let col = 0; col < nCols && pivotRow < nRows; col++) {
    // Find pivot
    let maxVal = Math.abs(N[pivotRow][col]);
    let maxRow = pivotRow;
    for (let r = pivotRow + 1; r < nRows; r++) {
      if (Math.abs(N[r][col]) > maxVal) {
        maxVal = Math.abs(N[r][col]);
        maxRow = r;
      }
    }
    
    if (maxVal < EPS) continue;
    
    // Swap rows
    if (maxRow !== pivotRow) {
      [N[pivotRow], N[maxRow]] = [N[maxRow], N[pivotRow]];
    }
    
    // Eliminate
    const pivot = N[pivotRow][col];
    for (let r = pivotRow + 1; r < nRows; r++) {
      const factor = N[r][col] / pivot;
      for (let c = col; c < nCols; c++) {
        N[r][c] -= factor * N[pivotRow][c];
      }
    }
    
    rank++;
    pivotRow++;
  }
  
  return rank;
}

/**
 * Classify species as boundary or floating
 */
function classifySpecies(
  reactions: Rxn[],
  nSpecies: number
): { boundary: number[]; floating: number[] } {
  const appearsAsReactant = new Set<number>();
  const appearsAsProduct = new Set<number>();
  
  for (const rxn of reactions) {
    for (const s of rxn.reactants) appearsAsReactant.add(s);
    for (const s of rxn.products) appearsAsProduct.add(s);
  }
  
  const boundary: number[] = [];
  const floating: number[] = [];
  
  for (let s = 0; s < nSpecies; s++) {
    const isReactant = appearsAsReactant.has(s);
    const isProduct = appearsAsProduct.has(s);
    
    if (isReactant && isProduct) {
      floating.push(s);
    } else if (isReactant || isProduct) {
      boundary.push(s);
    }
  }
  
  return { boundary, floating };
}

/**
 * Analyze reaction network structure
 * 
 * @param reactions - Array of reactions
 * @param nSpecies - Total number of species
 * @returns Network analysis results
 */
export function analyzeNetwork(reactions: Rxn[], nSpecies: number): NetworkAnalysis {
  console.log(`[NetworkAnalysis] Analyzing network with ${nSpecies} species, ${reactions.length} reactions`);
  
  // Find complexes
  const complexes = findComplexes(reactions);
  const numComplexes = complexes.length;
  
  // Build reaction graph
  const graph = buildComplexGraph(reactions, complexes);
  
  // Find linkage classes
  const linkageClasses = findLinkageClasses(complexes, graph);
  const numLinkageClasses = linkageClasses.length;
  
  // Compute stoichiometric rank
  const stoichiometricRank = computeStoichiometricRank(reactions, nSpecies);
  
  // Deficiency: δ = n - l - s
  // where n = number of complexes, l = number of linkage classes, s = stoichiometric rank
  const deficiency = numComplexes - numLinkageClasses - stoichiometricRank;
  
  // Check reversibility
  const isWeaklyReversible = checkWeaklyReversible(graph, linkageClasses);
  
  // Check if all reactions have a reverse
  const reactionPairs = new Set<string>();
  for (const rxn of reactions) {
    const fwd = `${complexToString(parseComplex(rxn.reactants))}->${complexToString(parseComplex(rxn.products))}`;
    const rev = `${complexToString(parseComplex(rxn.products))}->${complexToString(parseComplex(rxn.reactants))}`;
    reactionPairs.add(fwd);
  }
  let isReversible = true;
  for (const rxn of reactions) {
    const rev = `${complexToString(parseComplex(rxn.products))}->${complexToString(parseComplex(rxn.reactants))}`;
    if (!reactionPairs.has(rev)) {
      isReversible = false;
      break;
    }
  }
  
  // Classify species
  const { boundary, floating } = classifySpecies(reactions, nSpecies);
  
  console.log(`[NetworkAnalysis] Complexes: ${numComplexes}, Linkage classes: ${numLinkageClasses}, Rank: ${stoichiometricRank}, Deficiency: ${deficiency}`);
  console.log(`[NetworkAnalysis] Weakly reversible: ${isWeaklyReversible}, Reversible: ${isReversible}`);
  
  return {
    numSpecies: nSpecies,
    numReactions: reactions.length,
    complexes,
    numComplexes,
    linkageClasses,
    numLinkageClasses,
    deficiency,
    stoichiometricRank,
    isWeaklyReversible,
    isReversible,
    boundarySpecies: boundary,
    floatingSpecies: floating
  };
}

/**
 * Check Deficiency Zero Theorem conditions
 * 
 * If deficiency = 0 and network is weakly reversible, then:
 * - There exists a unique positive steady state in each stoichiometric compatibility class
 * - The steady state is asymptotically stable
 */
export function checkDeficiencyZeroTheorem(analysis: NetworkAnalysis): {
  applies: boolean;
  hasUniqueStableSSS: boolean;
  explanation: string;
} {
  if (analysis.deficiency === 0 && analysis.isWeaklyReversible) {
    return {
      applies: true,
      hasUniqueStableSSS: true,
      explanation: 'Deficiency Zero Theorem: Network has unique, asymptotically stable positive steady state per stoichiometric compatibility class.'
    };
  }
  
  if (analysis.deficiency === 0) {
    return {
      applies: false,
      hasUniqueStableSSS: false,
      explanation: 'Deficiency is zero but network is not weakly reversible.'
    };
  }
  
  return {
    applies: false,
    hasUniqueStableSSS: false,
    explanation: `Deficiency is ${analysis.deficiency} (non-zero). Deficiency Zero Theorem does not apply.`
  };
}
