/**
 * ConservationLaws.ts - Conservation law detection and system reduction
 * 
 * Inspired by Catalyst.jl's approach:
 * 1. Build stoichiometric matrix N where N[i,r] = net change of species i in reaction r
 * 2. Compute left null space of N (vectors v where v^T * N = 0)
 * 3. Each null space vector corresponds to a conservation law
 * 4. Eliminate dependent species to reduce ODE system size
 * 
 * For biochemical systems, conservation laws emerge from:
 * - Phosphorylation: A + A* = A_total
 * - Receptor binding: R + RL + RL* = R_total
 * - Enzyme conservation: E + ES = E_total
 */

import type { Rxn } from './graph/core/Rxn';

/**
 * A conservation law represents a linear combination of species that is constant.
 */
export interface ConservationLaw {
  /** Index of the dependent species to eliminate */
  dependentSpecies: number;
  /** Coefficients for all species in the conservation law */
  coefficients: Float64Array;
  /** Conserved total value (computed from initial conditions) */
  total: number;
  /** Human-readable description */
  description: string;
}

/**
 * Result of conservation law analysis
 */
export interface ConservationAnalysis {
  laws: ConservationLaw[];
  /** Indices of independent species (to keep in reduced system) */
  independentSpecies: number[];
  /** Indices of dependent species (to eliminate) */
  dependentSpecies: number[];
  /** Rank of stoichiometric matrix */
  rank: number;
}

/**
 * Build the stoichiometric matrix from reactions.
 * N[i][r] = net change in species i from reaction r
 * 
 * @param reactions - Array of reactions
 * @param nSpecies - Total number of species
 * @returns Stoichiometric matrix as 2D array
 */
export function buildStoichiometricMatrix(
  reactions: Rxn[],
  nSpecies: number
): number[][] {
  const N: number[][] = Array.from(
    { length: nSpecies },
    () => Array(reactions.length).fill(0)
  );

  for (let r = 0; r < reactions.length; r++) {
    const rxn = reactions[r];

    // Reactants are consumed (negative stoichiometry)
    for (const s of rxn.reactants) {
      N[s][r] -= 1;
    }

    // Products are produced (positive stoichiometry)
    for (const s of rxn.products) {
      N[s][r] += 1;
    }
  }

  return N;
}

/**
 * Compute the left null space of a matrix using Gaussian elimination.
 * The left null space consists of vectors v where v^T * N = 0.
 * 
 * This uses the transpose approach: nullspace(N^T) gives right null space of N^T,
 * which equals left null space of N.
 * 
 * @param N Stoichiometric matrix (rows = species, cols = reactions)
 * @returns Array of null space basis vectors (each has length = nSpecies)
 */
export function computeLeftNullSpace(N: number[][]): number[][] {
  const nSpecies = N.length;
  if (nSpecies === 0) return [];
  const nReactions = N[0].length;

  // Work with transpose N^T (nReactions x nSpecies)
  // Augment with identity: [N^T | I] of size nReactions x (nSpecies + nReactions)
  // After row reduction, rows with zero in N^T portion have the null space in I portion

  // Actually, we need: find vectors c such that c^T * N = 0
  // Equivalently: N^T * c = 0 (right null space of N^T)
  // 
  // Use augmented matrix approach: [N | I] and row reduce
  // If row becomes [0...0 | v], then v is in left null space

  // Build augmented matrix [N | I_nSpecies]
  const augmented: number[][] = N.map((row, i) => {
    const identity = Array(nSpecies).fill(0);
    identity[i] = 1;
    return [...row, ...identity];
  });

  const EPS = 1e-10;
  const nAugCols = nReactions + nSpecies;

  // Gaussian elimination with partial pivoting on the N portion
  let pivotRow = 0;
  const pivotCols: number[] = []; // Track which columns have pivots

  for (let col = 0; col < nReactions && pivotRow < nSpecies; col++) {
    // Find pivot in this column
    let maxVal = Math.abs(augmented[pivotRow][col]);
    let maxRow = pivotRow;
    for (let r = pivotRow + 1; r < nSpecies; r++) {
      if (Math.abs(augmented[r][col]) > maxVal) {
        maxVal = Math.abs(augmented[r][col]);
        maxRow = r;
      }
    }

    if (maxVal < EPS) continue; // Column is zero or nearly zero, skip

    // Swap rows
    if (maxRow !== pivotRow) {
      [augmented[pivotRow], augmented[maxRow]] = [augmented[maxRow], augmented[pivotRow]];
    }

    // Scale pivot row
    const scale = augmented[pivotRow][col];
    for (let c = 0; c < nAugCols; c++) {
      augmented[pivotRow][c] /= scale;
    }

    // Eliminate column in other rows
    for (let r = 0; r < nSpecies; r++) {
      if (r === pivotRow) continue;
      const factor = augmented[r][col];
      if (Math.abs(factor) < EPS) continue;
      for (let c = 0; c < nAugCols; c++) {
        augmented[r][c] -= factor * augmented[pivotRow][c];
      }
    }

    pivotCols.push(col);
    pivotRow++;
  }

  const rank = pivotRow;
  const nullDimension = nSpecies - rank;

  console.log(`[ConservationLaws] Stoichiometric rank: ${rank}, null space dimension: ${nullDimension}`);

  // Rows with all zeros in N portion are in the left null space
  // The identity portion gives us the coefficients
  const nullSpaceVectors: number[][] = [];

  for (let r = 0; r < nSpecies; r++) {
    let isZeroRow = true;
    for (let c = 0; c < nReactions; c++) {
      if (Math.abs(augmented[r][c]) > EPS) {
        isZeroRow = false;
        break;
      }
    }

    if (isZeroRow) {
      // Extract the identity portion as null space vector
      const vec = augmented[r].slice(nReactions, nReactions + nSpecies);

      // Normalize: make first non-zero entry positive
      let firstNonZero = 0;
      for (let i = 0; i < nSpecies; i++) {
        if (Math.abs(vec[i]) > EPS) {
          firstNonZero = i;
          break;
        }
      }
      if (vec[firstNonZero] < 0) {
        for (let i = 0; i < nSpecies; i++) vec[i] = -vec[i];
      }

      // Clean up near-zero entries
      for (let i = 0; i < nSpecies; i++) {
        if (Math.abs(vec[i]) < EPS) vec[i] = 0;
        // Round to integers if close (most biochemical systems have integer coefficients)
        const rounded = Math.round(vec[i]);
        if (Math.abs(vec[i] - rounded) < EPS) vec[i] = rounded;
      }

      nullSpaceVectors.push(vec);
    }
  }

  return nullSpaceVectors;
}

/**
 * Find conservation laws from the stoichiometric matrix.
 * Inspired by Catalyst.jl's approach.
 * 
 * @param reactions - Array of reactions
 * @param nSpecies - Total number of species
 * @param initialConcentrations - Initial concentrations to compute totals
 * @param speciesNames - Optional species names for descriptions
 * @returns Conservation analysis with laws and species classification
 */
export function findConservationLaws(
  reactions: Rxn[],
  nSpecies: number,
  initialConcentrations: Float64Array,
  speciesNames?: string[]
): ConservationAnalysis {
  const N = buildStoichiometricMatrix(reactions, nSpecies);
  const nullSpace = computeLeftNullSpace(N);

  const laws: ConservationLaw[] = [];
  const dependentSet = new Set<number>();

  for (const vec of nullSpace) {
    // Compute conserved total from initial conditions
    let total = 0;
    const involvedSpecies: string[] = [];

    for (let i = 0; i < nSpecies; i++) {
      if (Math.abs(vec[i]) > 1e-10) {
        total += vec[i] * initialConcentrations[i];
        const coef = vec[i] === 1 ? '' : `${vec[i]}*`;
        involvedSpecies.push(`${coef}${speciesNames?.[i] ?? `S${i}`}`);
      }
    }

    // Choose species with largest absolute coefficient to eliminate
    // Prefer species with larger initial concentration for numerical stability
    let maxIdx = -1;
    let maxScore = -Infinity;
    for (let i = 0; i < nSpecies; i++) {
      if (Math.abs(vec[i]) > 1e-10 && !dependentSet.has(i)) {
        // Score = |coefficient| * (1 + log(1 + concentration))
        const score = Math.abs(vec[i]) * (1 + Math.log(1 + initialConcentrations[i]));
        if (score > maxScore) {
          maxScore = score;
          maxIdx = i;
        }
      }
    }

    if (maxIdx >= 0) {
      dependentSet.add(maxIdx);

      const description = `${involvedSpecies.join(' + ')} = ${total.toExponential(3)}`;
      console.log(`[ConservationLaws] Found: ${description}`);

      laws.push({
        dependentSpecies: maxIdx,
        coefficients: new Float64Array(vec),
        total,
        description
      });
    }
  }

  // Classify species
  const dependentSpecies = Array.from(dependentSet).sort((a, b) => a - b);
  const independentSpecies: number[] = [];
  for (let i = 0; i < nSpecies; i++) {
    if (!dependentSet.has(i)) {
      independentSpecies.push(i);
    }
  }

  console.log(`[ConservationLaws] ${laws.length} conservation laws, ${independentSpecies.length} independent species`);

  return {
    laws,
    independentSpecies,
    dependentSpecies,
    rank: nSpecies - nullSpace.length
  };
}

/**
 * Apply conservation laws to reduce the ODE system.
 * Returns functions to:
 * 1. Map full state to reduced state
 * 2. Map reduced state back to full state
 * 3. Transform derivatives
 * 
 * @param analysis - Conservation analysis from findConservationLaws
 * @param nSpecies - Total number of species
 */
export function createReducedSystem(
  analysis: ConservationAnalysis,
  nSpecies: number
): {
  /** Number of independent species */
  reducedSize: number;
  /** Map full state y to reduced state y_r */
  reduce: (y: Float64Array) => Float64Array;
  /** Map reduced state y_r to full state y */
  expand: (y_r: Float64Array) => Float64Array;
  /** Transform full derivative function to reduced form */
  transformDerivatives: (
    fullDerivatives: (y: Float64Array, dydt: Float64Array) => void
  ) => (y_r: Float64Array, dydt_r: Float64Array) => void;
} {
  const { laws, independentSpecies, dependentSpecies } = analysis;
  const reducedSize = independentSpecies.length;

  // Precompute index mappings
  const fullToReduced = new Int32Array(nSpecies).fill(-1);
  for (let i = 0; i < independentSpecies.length; i++) {
    fullToReduced[independentSpecies[i]] = i;
  }

  // For each dependent species, compute: y[dep] = (total - sum(coef[j]*y[j] for j != dep)) / coef[dep]
  const dependentCoefs = laws.map(law => {
    const dep = law.dependentSpecies;
    const coef = law.coefficients[dep];
    return { dep, coef, law };
  });

  return {
    reducedSize,

    reduce(y: Float64Array): Float64Array {
      const y_r = new Float64Array(reducedSize);
      for (let i = 0; i < reducedSize; i++) {
        y_r[i] = y[independentSpecies[i]];
      }
      return y_r;
    },

    expand(y_r: Float64Array): Float64Array {
      const y = new Float64Array(nSpecies);

      // First, fill in independent species
      for (let i = 0; i < reducedSize; i++) {
        y[independentSpecies[i]] = y_r[i];
      }

      // Then, compute dependent species from conservation laws
      for (const { dep, coef, law } of dependentCoefs) {
        let sum = law.total;
        for (let j = 0; j < nSpecies; j++) {
          if (j !== dep && Math.abs(law.coefficients[j]) > 1e-15) {
            sum -= law.coefficients[j] * y[j];
          }
        }
        y[dep] = sum / coef;
        // Clamp to non-negative
        if (y[dep] < 0) y[dep] = 0;
      }

      return y;
    },

    transformDerivatives(
      fullDerivatives: (y: Float64Array, dydt: Float64Array) => void
    ): (y_r: Float64Array, dydt_r: Float64Array) => void {
      const fullY = new Float64Array(nSpecies);
      const fullDydt = new Float64Array(nSpecies);

      return (y_r: Float64Array, dydt_r: Float64Array) => {
        // Expand to full state
        for (let i = 0; i < reducedSize; i++) {
          fullY[independentSpecies[i]] = y_r[i];
        }
        for (const { dep, coef, law } of dependentCoefs) {
          let sum = law.total;
          for (let j = 0; j < nSpecies; j++) {
            if (j !== dep && Math.abs(law.coefficients[j]) > 1e-15) {
              sum -= law.coefficients[j] * fullY[j];
            }
          }
          fullY[dep] = Math.max(0, sum / coef);
        }

        // Compute full derivatives
        fullDerivatives(fullY, fullDydt);

        // Extract reduced derivatives
        for (let i = 0; i < reducedSize; i++) {
          dydt_r[i] = fullDydt[independentSpecies[i]];
        }
      };
    }
  };
}
