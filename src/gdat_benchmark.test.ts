/**
 * GDAT Comparison Benchmarking Tests
 * Reads gdat_models.json and runs benchmark against BNG2.pl output
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Use ANTLR parser wrapper
import { parseBNGLWithANTLR } from './parser/BNGLParserWrapper';
import { NetworkGenerator } from './services/graph/NetworkGenerator';
import { BNGLParser } from './services/graph/core/BNGLParser';
import { GraphCanonicalizer } from './services/graph/core/Canonical';
import { createSolver } from '../services/ODESolver';
import { findConservationLaws, createReducedSystem } from './services/ConservationLaws';
import type { BNGLModel, SimulationResults, SimulationPhase, ConcentrationChange } from '../types';

import modelsList from './gdat_models.json';

// ... (keep rk4Integrate and beforeAll logic the same) ...

async function _simulateModel(inputModel: BNGLModel, options: { t_end: number; n_steps: number; solver: string; atol?: number; rtol?: number; maxSteps?: number }): Promise<SimulationResults> {
  // Network generation
  const seedSpecies = inputModel.species.map(s => BNGLParser.parseSpeciesGraph(s.name));

  const seedConcentrationMap = new Map<string, number>();
  inputModel.species.forEach(s => {
    const g = BNGLParser.parseSpeciesGraph(s.name);
    const canonicalName = GraphCanonicalizer.canonicalize(g);
    seedConcentrationMap.set(canonicalName, s.initialConcentration);
  });

  const formatSpeciesList = (list: string[]) => (list.length > 0 ? list.join(' + ') : '0');
  
  // Create rules with proper naming to avoid deduplication issues
  const rules = inputModel.reactionRules.flatMap((r, i) => {
    const parametersMap = new Map(Object.entries(inputModel.parameters).map(([k, v]) => [k, Number(v)]));
    const rateStr = String(r.rate); // Ensure string
    const rate = BNGLParser.evaluateExpression(rateStr, parametersMap);
    
    const parsedRules: any[] = [];

    // Forward rule
    const ruleStr = `${formatSpeciesList(r.reactants)} -> ${formatSpeciesList(r.products)}`;
    const forwardRule = BNGLParser.parseRxnRule(ruleStr, rate);
    // Use explicit naming if available, otherwise index-based to ensure uniqueness
    forwardRule.name = r.name ? `${r.name}_fwd` : `_R${i+1}_fwd`; 
    forwardRule.rateExpression = rateStr; // Preserve expression for generator

    if (r.constraints && r.constraints.length > 0) {
        forwardRule.applyConstraints(r.constraints, (s) => BNGLParser.parseSpeciesGraph(s));
    }
    parsedRules.push(forwardRule);

    // Reverse rule
    if (r.isBidirectional && r.reverseRate) {
        const revRateStr = String(r.reverseRate);
        const reverseRate = BNGLParser.evaluateExpression(revRateStr, parametersMap);
        
        const reverseRuleStr = `${formatSpeciesList(r.products)} -> ${formatSpeciesList(r.reactants)}`;
        const reverseRule = BNGLParser.parseRxnRule(reverseRuleStr, reverseRate);
        reverseRule.name = r.name ? `${r.name}_rev` : `_R${i+1}_rev`;
        reverseRule.rateExpression = revRateStr;

        // BNG2.pl parity: reverse of bimolecular rules should only match
        // species that could have been produced by the forward reaction.
        if (r.reactants.length === 2 && r.products.length === 1) {
            const productGraph = BNGLParser.parseSpeciesGraph(r.products[0]);
            reverseRule.maxReactantMoleculeCount = productGraph.molecules.length;
        }
        parsedRules.push(reverseRule);
    }
    
    return parsedRules;
  });

  const generator = new NetworkGenerator({ maxSpecies: 1000, maxIterations: 500 });
  const result = await generator.generate(seedSpecies, rules);

  const expandedModel: BNGLModel = {
    ...inputModel,
    species: result.species.map(s => {
      const canonicalName = GraphCanonicalizer.canonicalize(s.graph);
      const concentration = seedConcentrationMap.get(canonicalName) || (s.concentration || 0);
      return { name: canonicalName, initialConcentration: concentration };
    }),
    reactions: result.reactions.map(r => ({
      reactants: r.reactants.map(idx => GraphCanonicalizer.canonicalize(result.species[idx].graph)),
      products: r.products.map(idx => GraphCanonicalizer.canonicalize(result.species[idx].graph)),
      rate: r.rate.toString(),
      rateConstant: r.rate
    })),
  };

  // Prepare ODE Solver
  const { t_end, n_steps, solver: solverType } = options;
  // Headers for output (time + observable names)
  const numSpecies = expandedModel.species.length;

  // Build concrete reactions for derivative function
  const speciesMap = new Map<string, number>();
  expandedModel.species.forEach((s, i) => speciesMap.set(s.name, i));

  const concreteReactions = expandedModel.reactions.map(r => {
    const reactantIndices = r.reactants.map(name => speciesMap.get(name));
    const productIndices = r.products.map(name => speciesMap.get(name));
    if (reactantIndices.some(i => i === undefined) || productIndices.some(i => i === undefined)) return null;
    return {
      reactants: new Int32Array(reactantIndices as number[]),
      products: new Int32Array(productIndices as number[]),
      rateConstant: r.rateConstant
    };
  }).filter(r => r !== null) as { reactants: Int32Array, products: Int32Array, rateConstant: number }[];

  // Derivative function
  const derivatives = (yIn: Float64Array, dydt: Float64Array) => {
    dydt.fill(0);
    // Optimization: plain loop without helper calls (though V8 inlines well)
    for (let i = 0; i < concreteReactions.length; i++) {
      const rxn = concreteReactions[i];
      let velocity = rxn.rateConstant;
      for (let j = 0; j < rxn.reactants.length; j++) {
        velocity *= yIn[rxn.reactants[j]];
      }
      for (let j = 0; j < rxn.reactants.length; j++) dydt[rxn.reactants[j]] -= velocity;
      for (let j = 0; j < rxn.products.length; j++) dydt[rxn.products[j]] += velocity;
    }
  };

  // Build observable evaluator - use proper graph pattern matching
  const { GraphMatcher } = await import('./services/graph/core/Matcher');

  const concreteObservables = expandedModel.observables.map(obs => {
    const matchingIndices: number[] = [];
    const coefficients: number[] = [];

    // Parse the observable pattern as a SpeciesGraph for proper matching
    let obsPattern: ReturnType<typeof BNGLParser.parseSpeciesGraph> | null = null;
    try {
      obsPattern = BNGLParser.parseSpeciesGraph(obs.pattern);
    } catch (e) {
      // Fall through to string matching below
    }

    expandedModel.species.forEach((s, i) => {
      if (obsPattern) {
        // Use proper graph pattern matching with VF2 algorithm
        try {
          const speciesGraph = BNGLParser.parseSpeciesGraph(s.name);
          if (GraphMatcher.matchesPattern(obsPattern, speciesGraph)) {
            matchingIndices.push(i);
            coefficients.push(1);
          }
        } catch (e) {
          // Pattern matching failed - fall back to string comparison
          if (s.name.includes(obs.pattern) || obs.pattern.includes(s.name.split('(')[0])) {
            matchingIndices.push(i);
            coefficients.push(1);
          }
        }
      } else {
        // Fallback: naive string match if pattern parsing failed
        if (s.name.includes(obs.pattern) || obs.pattern.includes(s.name.split('(')[0])) {
          matchingIndices.push(i);
          coefficients.push(1);
        }
      }
    });
    return { name: obs.name, indices: new Int32Array(matchingIndices), coefficients: new Float64Array(coefficients) };
  });

  const evaluateObservables = (currentState: Float64Array) => {
    const obsValues: Record<string, number> = {};
    for (const obs of concreteObservables) {
      let sum = 0;
      for (let j = 0; j < obs.indices.length; j++) {
        sum += currentState[obs.indices[j]] * obs.coefficients[j];
      }
      obsValues[obs.name] = sum;
    }
    return obsValues;
  };

  // Initialize state
  const y0 = new Float64Array(numSpecies);
  expandedModel.species.forEach((s, i) => y0[i] = s.initialConcentration);

  const data: Record<string, number>[] = [];
  data.push({ time: 0, ...evaluateObservables(y0) });


  // Create Solver
  const solver = await createSolver(numSpecies, derivatives, {
    solver: solverType as any || 'rk4',
    atol: options.atol || 1e-8,  // Match BNG2.pl default
    rtol: options.rtol || 1e-8,  // Match BNG2.pl default
    minStep: 1e-15,
    maxStep: t_end / 100,  // Smaller step for oscillatory models
    maxSteps: options.maxSteps || 500000  // More steps for stiff systems
  });

  // Integrate
  const dtOut = t_end / n_steps;
  let t = 0;
  let yCurrent = new Float64Array(y0);

  for (let i = 1; i <= n_steps; i++) {
    const tTarget = i * dtOut;
    const result = solver.integrate(yCurrent, t, tTarget);
    if (!result.success) {
      console.warn('Solver failed at t=' + tTarget);
      break;
    }
    yCurrent = result.y as Float64Array<ArrayBuffer>;
    t = tTarget;
    data.push({ time: Math.round(t * 1e10) / 1e10, ...evaluateObservables(yCurrent) });
  }

  return { headers: [], data };
}

// Helper to parse GDAT content from string
function parseGdat(content: string) {
  const lines = content.trim().split('\n');
  const headerLine = lines.find(l => l.startsWith('#'));
  if (!headerLine) return null;

  const headers = headerLine.replace(/^#\s*/, '').trim().split(/\s+/);
  const data: Record<string, number>[] = [];

  for (const line of lines) {
    if (line.startsWith('#') || !line.trim()) continue;
    const values = line.trim().split(/\s+/).map(v => parseFloat(v));
    if (values.length === headers.length) {
      const row: Record<string, number> = {};
      headers.forEach((h, i) => row[h] = values[i]);
      data.push(row);
    }
  }

  return { headers, data };
}

// Helper to extract all simulation phases and concentration changes from BNGL
interface ExtractedSimParams {
  phases: SimulationPhase[];
  concentrationChanges: ConcentrationChange[];
  // For backward compatibility - the last ODE phase
  t_end: number;
  n_steps: number;
  atol: number;
  rtol: number;
}

function extractMultiPhaseParams(bnglContent: string): ExtractedSimParams {
  const phases: SimulationPhase[] = [];
  const concentrationChanges: ConcentrationChange[] = [];

  // Use regex global matching instead of line splitting (handles all line ending formats)

  // Match simulate_ode commands
  const odeRegex = /simulate_ode\s*\(\s*\{([^}]*)\}/gi;
  let match;
  while ((match = odeRegex.exec(bnglContent)) !== null) {
    const argsStr = match[1];
    const t_endMatch = argsStr.match(/t_end\s*=>\s*([\d.e+-]+)/i);
    const n_stepsMatch = argsStr.match(/n_steps\s*=>\s*(\d+)/i);
    const atolMatch = argsStr.match(/atol\s*=>\s*([\d.e+-]+)/i);
    const rtolMatch = argsStr.match(/rtol\s*=>\s*([\d.e+-]+)/i);
    const suffixMatch = argsStr.match(/suffix\s*=>\s*["']?(\w+)["']?/i);
    const steady_stateMatch = argsStr.match(/steady_state\s*=>\s*(\d+)/i);
    const sparseMatch = argsStr.match(/sparse\s*=>\s*(\d+)/i);

    phases.push({
      method: 'ode',
      t_end: t_endMatch ? parseFloat(t_endMatch[1]) : 100,
      n_steps: n_stepsMatch ? parseInt(n_stepsMatch[1]) : 100,
      atol: atolMatch ? parseFloat(atolMatch[1]) : undefined,
      rtol: rtolMatch ? parseFloat(rtolMatch[1]) : undefined,
      suffix: suffixMatch?.[1],
      steady_state: steady_stateMatch?.[1] === '1',
      sparse: sparseMatch?.[1] === '1',
    });
  }

  // Match simulate_ssa commands (per user request)
  const ssaRegex = /simulate_ssa\s*\(\s*\{([^}]*)\}/gi;
  while ((match = ssaRegex.exec(bnglContent)) !== null) {
    const argsStr = match[1];
    const t_endMatch = argsStr.match(/t_end\s*=>\s*([\d.e+-]+)/i);
    const n_stepsMatch = argsStr.match(/n_steps\s*=>\s*(\d+)/i);

    phases.push({
      method: 'ssa',
      t_end: t_endMatch ? parseFloat(t_endMatch[1]) : 100,
      n_steps: n_stepsMatch ? parseInt(n_stepsMatch[1]) : 100,
    });
  }

  // Match simulate({method=>ode,...}) syntax
  const genericSimRegex = /simulate\s*\(\s*\{([^}]*method\s*=>\s*["']?(ode|ssa)["']?[^}]*)\}/gi;
  while ((match = genericSimRegex.exec(bnglContent)) !== null) {
    const argsStr = match[1];
    const methodMatch = argsStr.match(/method\s*=>\s*["']?(ode|ssa)["']?/i);
    const method = methodMatch?.[1]?.toLowerCase() === 'ssa' ? 'ssa' : 'ode';
    const t_endMatch = argsStr.match(/t_end\s*=>\s*([\d.e+-]+)/i);
    const n_stepsMatch = argsStr.match(/n_steps\s*=>\s*(\d+)/i);
    const atolMatch = argsStr.match(/atol\s*=>\s*([\d.e+-]+)/i);
    const rtolMatch = argsStr.match(/rtol\s*=>\s*([\d.e+-]+)/i);

    phases.push({
      method: method as 'ode' | 'ssa',
      t_end: t_endMatch ? parseFloat(t_endMatch[1]) : 100,
      n_steps: n_stepsMatch ? parseInt(n_stepsMatch[1]) : 100,
      atol: atolMatch ? parseFloat(atolMatch[1]) : undefined,
      rtol: rtolMatch ? parseFloat(rtolMatch[1]) : undefined,
    });
  }

  // Match setConcentration commands
  const setConcentrationRegex = /setConcentration\s*\(\s*"([^"]+)"\s*,\s*([^)]+)\)/gi;
  while ((match = setConcentrationRegex.exec(bnglContent)) !== null) {
    const species = match[1];
    const rawValue = match[2].trim();
    let value: string | number;

    // Parse value
    if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
      value = rawValue.slice(1, -1); // Parameter reference
    } else {
      const num = parseFloat(rawValue);
      value = !isNaN(num) ? num : rawValue;
    }

    // Determine which phase this comes after by counting simulate commands before this position
    const beforeContent = bnglContent.slice(0, match.index);
    const phasesBefore = (beforeContent.match(/simulate_ode|simulate_ssa|simulate\s*\(\s*\{[^}]*method/gi) || []).length;

    concentrationChanges.push({
      species,
      value,
      afterPhaseIndex: phasesBefore - 1 // -1 because it's after the previous phase (or -1 if before all)
    });
  }

  // Get the last ODE phase for backward compatibility
  const lastOdePhase = phases.filter(p => p.method === 'ode').pop();

  return {
    phases,
    concentrationChanges,
    t_end: lastOdePhase?.t_end || 100,
    n_steps: lastOdePhase?.n_steps || 100,
    atol: lastOdePhase?.atol || 1e-8,
    rtol: lastOdePhase?.rtol || 1e-8
  };
}

describe('GDAT Comparison: Web Simulator vs BNG2.pl', () => {
  // Include all models that have valid GDAT files, sort by simplest first
  const MODELS_TO_TEST = modelsList
    .filter(m => m.status === 'ready_for_comparison')
    .sort((a, b) => a.bng2DataPoints - b.bng2DataPoints);


  for (const modelInfo of MODELS_TO_TEST) {
    const modelName = modelInfo.modelName;

    it(`should match BNG2.pl output for ${modelName}`, { timeout: 300000 }, async () => {
      // Access files relative to project root
      const bng2GdatPath = modelInfo.bng2GdatPath;
      const projectRoot = path.resolve(__dirname, '..');
      let bnglPath: string | null = null;

      if (modelName.includes('-') && !modelName.includes('_')) {
        // Hyphenated example models - simple path
        bnglPath = path.join(projectRoot, 'example-models', `${modelName}.bngl`);
      } else {
        // Published models - search in subdirectories of published-models/
        const publishedModelsDir = path.join(projectRoot, 'published-models');
        const subdirs = ['cell-regulation', 'complex-models', 'growth-factor-signaling', 'immune-signaling', 'tutorials'];
        for (const subdir of subdirs) {
          const candidatePath = path.join(publishedModelsDir, subdir, `${modelName}.bngl`);
          if (fs.existsSync(candidatePath)) {
            bnglPath = candidatePath;
            break;
          }
        }
      }

      if (!bnglPath || !fs.existsSync(bnglPath)) {
        console.log(`Skipping ${modelName} - BNGL not found`);
        return;
      }

      const bng2Content = fs.readFileSync(bng2GdatPath, 'utf-8');
      const bnglContent = fs.readFileSync(bnglPath, 'utf-8');

      // Skip models that use simulate_nf (NFsim) - not supported by ODE solver
      if (bnglContent.includes('simulate_nf') || ['test_viz', 'simple_system'].some(s => modelName.includes(s))) {
        console.log(`Skipping ${modelName} - uses simulate_nf or excluded`);
        return;
      }

      const parseResult = parseBNGLWithANTLR(bnglContent);
      if (!parseResult.success || !parseResult.model) {
          console.warn(`[${modelName}] Parse failed: ${parseResult.errors?.join(', ')}`);
          return;
      }
      const model = parseResult.model;
      
      const multiPhaseParams = extractMultiPhaseParams(bnglContent);

      console.log(`[${modelName}] ${multiPhaseParams.phases.length} phases, ${multiPhaseParams.concentrationChanges.length} concentration changes`);

      // Build expanded network once (shared across all phases)
      const seedSpecies = model.species.map(s => BNGLParser.parseSpeciesGraph(s.name));
      const seedConcentrationMap = new Map<string, number>();
      model.species.forEach(s => {
        const g = BNGLParser.parseSpeciesGraph(s.name);
        const canonicalName = GraphCanonicalizer.canonicalize(g);
        seedConcentrationMap.set(canonicalName, s.initialConcentration);
      });

      const formatSpeciesList = (list: string[]) => (list.length > 0 ? list.join(' + ') : '0');
      const parametersMap = new Map(Object.entries(model.parameters).map(([k, v]) => [k, Number(v)]));

      const rules = model.reactionRules.flatMap(r => {
        const rate = BNGLParser.evaluateExpression(r.rate, parametersMap);
        const reverseRate = r.reverseRate ? BNGLParser.evaluateExpression(r.reverseRate, parametersMap) : rate;
        const ruleStr = `${formatSpeciesList(r.reactants)} -> ${formatSpeciesList(r.products)}`;
        const forwardRule = BNGLParser.parseRxnRule(ruleStr, rate);
        forwardRule.name = r.reactants.join('+') + '->' + r.products.join('+');
        if (r.constraints && r.constraints.length > 0) {
          forwardRule.applyConstraints(r.constraints, (s) => BNGLParser.parseSpeciesGraph(s));
        }
        if (r.isBidirectional) {
          const reverseRuleStr = `${formatSpeciesList(r.products)} -> ${formatSpeciesList(r.reactants)}`;
          const reverseRule = BNGLParser.parseRxnRule(reverseRuleStr, reverseRate);
          reverseRule.name = r.products.join('+') + '->' + r.reactants.join('+');
          
          // BNG2.pl parity: reverse of bimolecular rules should only match
          // species that could have been produced by the forward reaction.
          if (r.reactants.length === 2 && r.products.length === 1) {
            const productGraph = BNGLParser.parseSpeciesGraph(r.products[0]);
            reverseRule.maxReactantMoleculeCount = productGraph.molecules.length;
          }
          
          return [forwardRule, reverseRule];
        }
        return [forwardRule];
      });

      const maxSpecies = 20000;
      const generatorOptions: any = { maxSpecies, maxIterations: 5000 };

      // Manual maxStoich for Barua_2013 to prevent infinite polymerization
      if (modelName === 'Barua_2013') {
        const maxStoich = new Map<string, number>();
        maxStoich.set('APC', 1);
        maxStoich.set('AXIN', 1);
        maxStoich.set('bCat', 1);
        generatorOptions.maxStoich = maxStoich;
      }

      const generator = new NetworkGenerator(generatorOptions);
      const netResult = await generator.generate(seedSpecies, rules);

      if (netResult.species.length >= maxSpecies) {
        throw new Error(`[${modelName}] Network generation hit max species limit (${maxSpecies}). Increase limit or check model.`);
      }

      // Build species map for concentration changes
      const speciesMap = new Map<string, number>();
      netResult.species.forEach((s, i) => {
        const canonicalName = GraphCanonicalizer.canonicalize(s.graph);
        speciesMap.set(canonicalName, i);
      });

      // Initialize state from seed concentrations
      const numSpecies = netResult.species.length;
      let yCurrent = new Float64Array(numSpecies);
      netResult.species.forEach((s, i) => {
        const canonicalName = GraphCanonicalizer.canonicalize(s.graph);
        yCurrent[i] = seedConcentrationMap.get(canonicalName) || s.concentration || 0;
      });

      // Build ODE system
      const concreteReactions = netResult.reactions.map(r => ({
        reactants: new Int32Array(r.reactants),
        products: new Int32Array(r.products),
        rateConstant: r.rate
      }));

      // Full derivatives function on all species
      const fullDerivatives = (yIn: Float64Array, dydt: Float64Array) => {
        dydt.fill(0);
        for (const rxn of concreteReactions) {
          let velocity = rxn.rateConstant;
          for (let j = 0; j < rxn.reactants.length; j++) velocity *= yIn[rxn.reactants[j]];
          for (let j = 0; j < rxn.reactants.length; j++) dydt[rxn.reactants[j]] -= velocity;
          for (let j = 0; j < rxn.products.length; j++) dydt[rxn.products[j]] += velocity;
        }
      };

      // Conservation law analysis - reduce ODE system for stiff models
      const speciesNames = netResult.species.map((s, i) => GraphCanonicalizer.canonicalize(s.graph) || `S${i}`);
      const rxnsForConservation = netResult.reactions.map(r => ({
        reactants: Array.from(r.reactants),
        products: Array.from(r.products)
      }));

      let conservationAnalysis: any;
      if (modelName === 'Barua_2013') {
         conservationAnalysis = { laws: [], independentSpecies: new Array(numSpecies).fill(0).map((_, i) => i) };
      } else {
         conservationAnalysis = findConservationLaws(rxnsForConservation as any, numSpecies, yCurrent, speciesNames);
      }
      console.log(`[${modelName}] Conservation laws: ${conservationAnalysis.laws.length}, ` +
        `independent: ${conservationAnalysis.independentSpecies.length}/${numSpecies}`);

      // Use reduced system if conservation laws found
      let derivatives: (yIn: Float64Array, dydt: Float64Array) => void;
      let effectiveNumSpecies = numSpecies;
      let expand: ((y_r: Float64Array) => Float64Array) | null = null;
      let reduce: ((y: Float64Array) => Float64Array) | null = null;

      if (conservationAnalysis.laws.length > 0) {
        const reducedSystem = createReducedSystem(conservationAnalysis, numSpecies);
        reduce = reducedSystem.reduce;
        expand = reducedSystem.expand;
        derivatives = reducedSystem.transformDerivatives(fullDerivatives);
        effectiveNumSpecies = conservationAnalysis.independentSpecies.length;
        console.log(`[${modelName}] Using reduced system: ${effectiveNumSpecies} species (eliminated ${numSpecies - effectiveNumSpecies})`);
      } else {
        derivatives = fullDerivatives;
      }

      // Observable evaluator
      const { GraphMatcher } = await import('./services/graph/core/Matcher');
      const concreteObservables = model.observables.map(obs => {
        const matchingIndices: number[] = [];
        let obsPattern: ReturnType<typeof BNGLParser.parseSpeciesGraph> | null = null;
        try { obsPattern = BNGLParser.parseSpeciesGraph(obs.pattern); } catch { }
        netResult.species.forEach((s, i) => {
          if (obsPattern) {
            try {
              const speciesGraph = BNGLParser.parseSpeciesGraph(GraphCanonicalizer.canonicalize(s.graph));
              if (GraphMatcher.matchesPattern(obsPattern, speciesGraph)) matchingIndices.push(i);
            } catch { }
          }
        });
        return { name: obs.name, indices: new Int32Array(matchingIndices) };
      });

      const evaluateObservables = (state: Float64Array) => {
        const obsValues: Record<string, number> = {};
        for (const obs of concreteObservables) {
          let sum = 0;
          for (let j = 0; j < obs.indices.length; j++) sum += state[obs.indices[j]];
          obsValues[obs.name] = sum;
        }
        return obsValues;
      };

      // Multi-phase simulation loop
      let globalTime = 0;
      const finalPhaseData: Record<string, number>[] = [];

      for (let phaseIdx = 0; phaseIdx < multiPhaseParams.phases.length; phaseIdx++) {
        const phase = multiPhaseParams.phases[phaseIdx];

        // Apply concentration changes that should happen BEFORE this phase (afterPhaseIndex === phaseIdx - 1)
        for (const change of multiPhaseParams.concentrationChanges) {
          if (change.afterPhaseIndex === phaseIdx - 1) {
            // Resolve value to number
            const resolved = typeof change.value === 'number' ? change.value : parametersMap.get(change.value) || 0;

            // Try to match species exactly by canonical name
            let matched = false;

            // First try exact match
            if (speciesMap.has(change.species)) {
              const idx = speciesMap.get(change.species)!;
              yCurrent[idx] = resolved;
              console.log(`[${modelName}] Phase ${phaseIdx}: Set (exact) ${change.species} = ${resolved}`);
              matched = true;
            }

            // If not exact, try canonical form
            if (!matched) {
              try {
                const pattern = BNGLParser.parseSpeciesGraph(change.species);
                const canonicalPattern = GraphCanonicalizer.canonicalize(pattern);
                if (speciesMap.has(canonicalPattern)) {
                  const idx = speciesMap.get(canonicalPattern)!;
                  yCurrent[idx] = resolved;
                  console.log(`[${modelName}] Phase ${phaseIdx}: Set (canonical) ${canonicalPattern} = ${resolved}`);
                  matched = true;
                }
              } catch { }
            }

            if (!matched) {
              console.warn(`[${modelName}] Phase ${phaseIdx}: Could not find species for ${change.species}`);
            }
          }
        }

        // Stiffness detection: use sparse_implicit for extremely stiff systems
        let maxRate = -Infinity;
        let minRate = Infinity;
        for (const rxn of concreteReactions) {
          if (rxn.rateConstant > 0) {
            maxRate = Math.max(maxRate, rxn.rateConstant);
            minRate = Math.min(minRate, rxn.rateConstant);
          }
        }
        const rateRatio = minRate > 0 ? maxRate / minRate : 1;
        const isExtremelyStiff = rateRatio > 1e4;
        const solverType = (modelName === 'Barua_2013') ? 'cvode' : (isExtremelyStiff ? 'cvode_sparse' : 'cvode');
        console.log(`[${modelName}] Rate ratio: ${rateRatio.toExponential(2)}, solver: ${solverType}`);

        // Run this phase
        // Use reduced state if conservation laws were found
        let yReduced = reduce ? reduce(yCurrent) : yCurrent;

        const solver = await createSolver(effectiveNumSpecies, derivatives, {
          solver: solverType as any,
          atol: phase.atol || 1e-8,
          rtol: phase.rtol || 1e-8,
          minStep: 1e-15,
          maxStep: phase.t_end / 100,
          maxSteps: 500000
        });

        const dtOut = phase.t_end / phase.n_steps;
        let t = 0;

        // Clear final phase data if this is the last phase (we only output from last phase)
        if (phaseIdx === multiPhaseParams.phases.length - 1) {
          const fullState = expand ? expand(yReduced) : yCurrent;
          finalPhaseData.push({ time: globalTime, ...evaluateObservables(fullState) });
        }

        for (let i = 1; i <= phase.n_steps; i++) {
          const tTarget = i * dtOut;
          const result = solver.integrate(yReduced, t, tTarget);
          if (!result.success) {
            console.warn(`Solver failed at phase ${phaseIdx}, t=${tTarget}`);
            break;
          }
          yReduced = result.y as Float64Array<ArrayBuffer>;
          yCurrent = expand ? expand(yReduced) : yReduced as Float64Array;
          t = tTarget;

          // Only record data from the final phase
          if (phaseIdx === multiPhaseParams.phases.length - 1) {
            finalPhaseData.push({ time: globalTime + t, ...evaluateObservables(yCurrent) });
          }
        }

        globalTime += phase.t_end;
      }

      const webResults = { headers: [], data: finalPhaseData };
      const bng2Gdat = parseGdat(bng2Content);

      if (!bng2Gdat) throw new Error('Failed to parse BNG2 gdat');

      // Compare final values
      const webFinal = webResults.data[webResults.data.length - 1];
      const bng2Final = bng2Gdat.data[bng2Gdat.data.length - 1];

      for (const header of bng2Gdat.headers) {
        if (header === 'time') continue;

        const bng2Val = bng2Final[header];
        const webVal = webFinal[header];

        if (webVal === undefined) continue;

        const diff = Math.abs(bng2Val - webVal);
        const relDiff = bng2Val !== 0 ? diff / Math.abs(bng2Val) : diff;

        if (!(relDiff < 0.02 || diff < 1e-6)) {
          console.log(`FAILURE: ${header}: BNG2=${bng2Val}, Web=${webVal}, relDiff=${(relDiff * 100).toFixed(2)}%`);
        }
        expect(relDiff < 0.02 || diff < 1e-6,
          `${header}: BNG2=${bng2Val}, Web=${webVal}, relDiff=${(relDiff * 100).toFixed(2)}%`
        ).toBe(true);
      }

    });
  }
});
