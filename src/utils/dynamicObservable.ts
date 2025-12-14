/**
 * Dynamic Observable Computation Utility
 * 
 * Allows defining new observables on-the-fly and computing their values
 * from existing simulation results WITHOUT re-running the simulation.
 */

import { BNGLParser } from '../services/graph/core/BNGLParser';
import { GraphMatcher } from '../services/graph/core/Matcher';
import { SpeciesGraph } from '../services/graph/core/SpeciesGraph';
import { SimulationResults } from '../../types';

export interface DynamicObservableDefinition {
  name: string;
  pattern: string;  // BNGL pattern like "A(b!+)" or "A.B"
  type: 'molecules' | 'species';  // molecules counts with multiplicity, species counts once
}

export interface ComputedObservableResult {
  name: string;
  values: number[];  // one value per time point
  matchingSpeciesCount: number;
}

/**
 * Parse and validate a BNGL observable pattern
 * Returns the parsed SpeciesGraph or throws an error
 */
export function parseObservablePattern(pattern: string): SpeciesGraph {
  const trimmed = pattern.trim();
  if (!trimmed) {
    throw new Error('Observable pattern cannot be empty');
  }
  
  try {
    return BNGLParser.parseSpeciesGraph(trimmed);
  } catch (e: any) {
    throw new Error(`Invalid BNGL pattern "${pattern}": ${e.message}`);
  }
}

/**
 * Find species that match the given pattern and compute the observable value
 * 
 * @param pattern - Parsed SpeciesGraph pattern
 * @param speciesNames - Array of species names (canonical strings from simulation)
 * @param speciesGraphs - Map of species name to parsed SpeciesGraph (cached for efficiency)
 * @param concentrations - Array of concentrations at one time point (indexed by species order)
 * @param type - 'molecules' counts matches with multiplicity, 'species' counts each matching species once
 * @returns The observable value (sum of concentrations)
 */
export function computeObservableValue(
  pattern: SpeciesGraph,
  speciesNames: string[],
  speciesGraphs: Map<string, SpeciesGraph>,
  concentrations: number[],
  type: 'molecules' | 'species' = 'molecules'
): { value: number; matchCount: number } {
  let value = 0;
  let matchCount = 0;
  
  for (let i = 0; i < speciesNames.length; i++) {
    const speciesName = speciesNames[i];
    const conc = concentrations[i];
    
    // Get or parse the species graph
    let speciesGraph = speciesGraphs.get(speciesName);
    if (!speciesGraph) {
      try {
        speciesGraph = BNGLParser.parseSpeciesGraph(speciesName);
        speciesGraphs.set(speciesName, speciesGraph);
      } catch (e: any) {
        // BUG FIX: Log warning for unparseable species (don't silently skip)
        console.warn(`[computeObservableValue] Failed to parse species '${speciesName}': ${e.message}`);
        continue;
      }
    }
    
    // Find matches
    const matches = GraphMatcher.findAllMaps(pattern, speciesGraph);
    
    if (matches.length > 0) {
      matchCount++;
      if (type === 'molecules') {
        // Count with multiplicity (number of matches)
        value += conc * matches.length;
      } else {
        // Count species once
        value += conc;
      }
    }
  }
  
  return { value, matchCount };
}

/**
 * Compute a dynamic observable across all time points in simulation results
 * 
 * @param definition - The observable definition (name and pattern)
 * @param results - Simulation results with species concentrations
 * @param speciesNames - Ordered list of species names (matching column order in results)
 * @returns Computed values for each time point
 */
export function computeDynamicObservable(
  definition: DynamicObservableDefinition,
  results: SimulationResults,
  speciesNames: string[]
): ComputedObservableResult {
  // Parse the pattern once
  const pattern = parseObservablePattern(definition.pattern);
  
  // Cache for parsed species graphs
  const speciesGraphCache = new Map<string, SpeciesGraph>();
  
  const values: number[] = [];
  let totalMatches = 0;
  
  // CRITICAL: Use speciesData, not data (data has observable values, speciesData has species concentrations)
  const speciesDataPoints = results.speciesData;
  if (!speciesDataPoints || speciesDataPoints.length === 0) {
    console.warn('[computeDynamicObservable] No speciesData available in results');
    // Return zeros if no species data
    return {
      name: definition.name,
      values: new Array(results.data.length).fill(0),
      matchingSpeciesCount: 0
    };
  }
  
  // Process each time point
  for (const dataPoint of speciesDataPoints) {
    // Extract concentrations in species order
    const concentrations = speciesNames.map(name => {
      const val = dataPoint[name];
      return typeof val === 'number' ? val : 0;
    });
    
    const { value, matchCount } = computeObservableValue(
      pattern,
      speciesNames,
      speciesGraphCache,
      concentrations,
      definition.type
    );
    
    values.push(value);
    totalMatches = Math.max(totalMatches, matchCount);
  }
  
  return {
    name: definition.name,
    values,
    matchingSpeciesCount: totalMatches
  };
}

/**
 * Check if a pattern is valid BNGL syntax
 * Returns null if valid, error message if invalid
 */
export function validateObservablePattern(pattern: string): string | null {
  try {
    parseObservablePattern(pattern);
    return null;
  } catch (e: any) {
    return e.message;
  }
}
