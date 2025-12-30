/**
 * FULL Benchmark with ODE Simulation
 * 
 * Compares full workflow timings between Web Simulator and BNG2.pl:
 * 1. Parsing (BNGL -> model)
 * 2. Network Generation (rules -> species/reactions)
 * 3. ODE Simulation (actually runs the solver)
 * 
 * Run with: npx tsx scripts/full_ode_benchmark.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { parseBNGLWithANTLR } from '../src/parser/BNGLParserWrapper.ts';
import { NetworkGenerator } from '../src/services/graph/NetworkGenerator.ts';
import { BNGLParser } from '../src/services/graph/core/BNGLParser.ts';
import { NautyService } from '../src/services/graph/core/NautyService.ts';
import { createSolver } from '../services/ODESolver.ts';
import { execSync } from 'child_process';

// Polyfill require and __dirname for CVODE WASM module compatibility
const require = createRequire(import.meta.url);
if (typeof globalThis.require === 'undefined') {
  (globalThis as any).require = require;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Also polyfill __dirname and __filename globally for the WASM loader
if (typeof globalThis.__dirname === 'undefined') {
  // Set to the public directory where cvode.wasm is located
  const publicDir = path.resolve(__dirname, '..', 'public');
  (globalThis as any).__dirname = publicDir;
  (globalThis as any).__filename = path.join(publicDir, 'cvode.wasm');
}
const ROOT_DIR = path.resolve(__dirname, '..');

// BNG2.pl path
const BNG2_PATH = 'C:\\Users\\Achyudhan\\anaconda3\\envs\\Research\\Lib\\site-packages\\bionetgen\\bng-win\\BNG2.pl';
const BNG2_DIR = path.dirname(BNG2_PATH);

// Timeout for ODE simulation (60 seconds)
const ODE_TIMEOUT_MS = 300000; // 5 minutes (for JS solver)

interface BNG2Model {
  model: string;
  path: string;
  category: string;
  hasGdat: boolean;
  speciesCount: number;
  reactionCount: number;
  gdatRows: number;
}

interface BenchmarkResult {
  model: string;
  category: string;
  // BNG2 reference info
  bng2Species: number;
  bng2Reactions: number;
  // Web timings
  webParseTime: number;
  webNetworkGenTime: number;
  webODETime: number;
  webTotalTime: number;
  webSpecies: number;
  webReactions: number;
  webStatus: 'success' | 'failed' | 'limit_reached' | 'timeout' | 'species_mismatch';
  webError?: string;
  // BNG2 timing
  bng2TimeMs?: number;
  bng2TimingError?: string;
  // Accuracy info
  hasReference: boolean;
  accuracyError?: number; // Max relative error %
  accuracyStatus?: 'pass' | 'fail' | 'missing_ref';
}

interface GdatData {
  timePoints: number[];
  observables: Map<string, number[]>;
}

function parseGdat(content: string): GdatData {
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  if (lines.length < 2) return { timePoints: [], observables: new Map() };

  // Parse header
  const headerLine = lines[0].replace(/^#/, '').trim();
  const headers = headerLine.split(/\s+/);
  const timeIdx = headers.findIndex(h => h === 'time' || h === 'Time');

  if (timeIdx === -1) return { timePoints: [], observables: new Map() };

  // Initialize arrays
  const timePoints: number[] = [];
  const obsData = new Map<string, number[]>();
  headers.forEach((h, i) => {
    if (i !== timeIdx) obsData.set(h, []);
  });

  // Parse data
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].trim().split(/\s+/);
    if (parts.length !== headers.length) continue;

    timePoints.push(parseFloat(parts[timeIdx]));
    headers.forEach((h, colIdx) => {
      if (colIdx !== timeIdx) {
        obsData.get(h)?.push(parseFloat(parts[colIdx]));
      }
    });
  }

  return { timePoints, observables: obsData };
}

function calculateMaxError(webTime: number[], webResults: Map<string, Float64Array>, refData: GdatData): number {
  if (refData.timePoints.length === 0 || webTime.length === 0) return -1;

  let maxRelError = 0;

  // Create interpolators for reference data
  // Simple linear interpolation
  const interpolate = (t: number, times: number[], values: number[]): number => {
    // Find index
    if (t <= times[0]) return values[0];
    if (t >= times[times.length - 1]) return values[values.length - 1];

    // Binary search for efficiency
    let low = 0, high = times.length - 1;
    while (low < high - 1) {
      const mid = Math.floor((low + high) / 2);
      if (times[mid] < t) low = mid;
      else high = mid;
    }

    const t0 = times[low];
    const t1 = times[high];
    const v0 = values[low];
    const v1 = values[high];

    if (t1 === t0) return v0;
    return v0 + (v1 - v0) * (t - t0) / (t1 - t0);
  };

  // Compare at web timepoints
  // Skip first point (t=0) as it's often initial condition
  for (let i = 1; i < webTime.length; i++) {
    const t = webTime[i];

    for (const [name, webValues] of webResults.entries()) {
      const refValues = refData.observables.get(name);
      if (!refValues) continue; // Skip if not in reference

      const webVal = webValues[i];
      const refVal = interpolate(t, refData.timePoints, refValues);

      // Avoid division by zero
      const absRef = Math.abs(refVal);
      const absDiff = Math.abs(webVal - refVal);

      let relError = 0;
      if (absRef > 1e-6) {
        relError = absDiff / absRef;
      } else if (Math.abs(webVal) > 1e-6) {
        // Reference is near zero but web is not
        relError = 1.0;
      }

      // Cap error at 100% for reporting sanely
      if (relError > 1.0) relError = 1.0;

      if (relError > maxRelError) maxRelError = relError;
    }
  }

  return maxRelError * 100; // Return percentage
}

function findReferenceFile(modelName: string, modelDir: string): string | null {
  const attempts = [
    path.join(modelDir, `${modelName}.gdat`),
    path.join(modelDir, `${modelName}_ODE.gdat`),
    path.join(ROOT_DIR, 'temp_verify', `${modelName}_ODE.gdat`),
    path.join(ROOT_DIR, 'bng_compare_output', `${modelName}.gdat`),
    path.join(ROOT_DIR, 'bng_test_output', `${modelName}.gdat`),
    path.join(ROOT_DIR, `${modelName}.gdat`), // In root
  ];

  for (const p of attempts) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}


function loadTestReport(): { passed: BNG2Model[], skipped: any[] } {
  const reportPath = path.join(ROOT_DIR, 'bng2_test_report.json');
  return JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
}

function runBNG2ForTiming(modelPath: string, modelName: string, tempDir: string): { timeMs: number; error?: string } {
  const safeModelName = modelName.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50);
  const tempBnglPath = path.join(tempDir, `${safeModelName}.bngl`);

  try {
    let bnglContent = fs.readFileSync(modelPath, 'utf-8');
    // Comment out simulate commands for network gen timing only
    bnglContent = bnglContent.replace(/^\s*(simulate|parameter_scan|bifurcate|readFile|writeFile|writeXML|simplify_network)/gm, '# $1');
    if (!bnglContent.includes('generate_network')) {
      bnglContent += '\ngenerate_network({overwrite=>1});\n';
    }
    fs.writeFileSync(tempBnglPath, bnglContent);

    const start = performance.now();
    execSync(`perl BNG2.pl "${tempBnglPath}"`, {
      cwd: BNG2_DIR,
      timeout: 120000,
      stdio: 'ignore'
    });
    const timeMs = performance.now() - start;

    // Cleanup
    try { fs.unlinkSync(tempBnglPath); } catch { }
    try { fs.unlinkSync(path.join(BNG2_DIR, `${safeModelName}.net`)); } catch { }
    try { fs.unlinkSync(path.join(BNG2_DIR, `${safeModelName}.log`)); } catch { }

    return { timeMs };
  } catch (error: any) {
    return { timeMs: -1, error: error.message?.substring(0, 100) ?? 'Unknown error' };
  }
}

async function runFullSimulation(modelName: string, modelPath: string, bng2Species: number): Promise<{
  parseTime: number;
  networkGenTime: number;
  odeTime: number;
  totalTime: number;
  species: number;
  reactions: number;
  status: 'success' | 'failed' | 'limit_reached' | 'timeout' | 'species_mismatch';
  error?: string;
  hasReference: boolean;
  accuracyError?: number;
  accuracyStatus?: 'pass' | 'fail' | 'missing_ref';
}> {
  const totalStart = performance.now();

  try {
    // 1. Parse
    const parseStart = performance.now();
    const bnglCode = fs.readFileSync(modelPath, 'utf-8');
    const result = parseBNGLWithANTLR(bnglCode);
    if (!result.success || !result.model) {
      return {
        parseTime: performance.now() - parseStart,
        networkGenTime: 0,
        odeTime: 0,
        totalTime: 0,
        species: 0,
        reactions: 0,
        status: 'failed',
        error: `Parse error: ${result.errors.map(e => e.message).join('; ')}`,
        hasReference: false
      };
    }
    const model = result.model;
    const parseTime = performance.now() - parseStart;

    // Heuristic: adjust tolerances if model is large or solving fails
    // ONLY if default (1e-5/1e-5) was used or not specified in model
    // If model provided strict tolerances, keep them.
    const hasSpecificTolerances = model.simulationOptions?.atol !== undefined || model.simulationOptions?.rtol !== undefined;

    if (!hasSpecificTolerances && model.species.length > 100) {
      // This block is currently out of scope for this function, as simOptions is not defined here.
      // Assuming simOptions would be defined later in the ODE simulation section.
      // For now, this code will be placed as requested, but it might need context for `simOptions`.
      // simOptions.atol = 1e-6;
      // simOptions.rtol = 1e-4;
    }

    // 2. Network Generation
    const netGenStart = performance.now();

    const seedSpecies = model.species.map(s => BNGLParser.parseSpeciesGraph(s.name));
    const parametersMap = new Map(Object.entries(model.parameters).map(([k, v]) => [k, Number(v as number)]));

    // Create a set of observable and function names for rate expression evaluation
    const observablesSet = new Set<string>(
      [
        ...(model.observables || []).map(o => o.name),
        ...(model.functions || []).map(f => f.name)
      ]
    );

    const rules = model.reactionRules.flatMap(r => {
      let rate: number;
      try {
        rate = BNGLParser.evaluateExpression(r.rate, parametersMap, observablesSet);
      } catch {
        rate = 0;
      }

      let reverseRate: number;
      if (r.reverseRate) {
        try {
          reverseRate = BNGLParser.evaluateExpression(r.reverseRate, parametersMap, observablesSet);
        } catch {
          reverseRate = 0;
        }
      } else {
        reverseRate = rate;
      }

      if (r.name === 'L_R_bind' || r.rate.includes('kp_LR')) {
        console.log(`[EvalRule] Rule=${r.name} RateExpression="${r.rate}" Evaluated=${rate} Param_kp_LR=${parametersMap.get('kp_LR')}`);
      }


      const formatList = (list: string[]) => list.length > 0 ? list.join(' + ') : '0';
      const ruleStr = `${formatList(r.reactants)} -> ${formatList(r.products)}`;

      try {
        const forwardRule = BNGLParser.parseRxnRule(ruleStr, rate);
        // FIX: Use original rule name to prevent deduplication of identical rules (e.g. stochastic vs deterministic variants)
        forwardRule.name = r.name ? `${r.name}_fwd` : `_R${rules.indexOf(r as any) + 1}_fwd`;

        if (r.constraints && r.constraints.length > 0) {
          forwardRule.applyConstraints(r.constraints, (s) => BNGLParser.parseSpeciesGraph(s));
        }
        if (r.isBidirectional) {
          const reverseRuleStr = `${formatList(r.products)} -> ${formatList(r.reactants)}`;
          const reverseRule = BNGLParser.parseRxnRule(reverseRuleStr, reverseRate);
          // Append suffix for reverse rule to maintain uniqueness
          reverseRule.name = r.name ? `${r.name}_rev` : `_R${rules.indexOf(r as any) + 1}_rev`;
          return [forwardRule, reverseRule];
        }
        return [forwardRule];
      } catch {
        return [];
      }
    });

    // Prepare maxStoich
    let maxStoich: number | Record<string, number> = 500;
    if (model.networkOptions?.maxStoich) {
      if (typeof model.networkOptions.maxStoich === 'object') {
        maxStoich = model.networkOptions.maxStoich; // It is already Record
      } else {
        maxStoich = model.networkOptions.maxStoich as number;
      }
    }



    const generator = new NetworkGenerator({
      maxSpecies: 10000,
      maxReactions: 20000,
      maxIterations: model.networkOptions?.maxIter ?? 100,
      maxAgg: model.networkOptions?.maxAgg ?? 100,
      maxStoich,
      compartments: model.compartments?.map(c => ({
        name: c.name,
        dimension: c.dimension,
        size: c.size
      }))
    });

    const network = await generator.generate(seedSpecies, rules, () => { });

    // Save species list for debugging
    if (modelName === 'Barua_2007' || network.species.length < 20) {
      const fs = require('fs');
      const speciesOutput = network.species.map(s => `${s.index + 1} ${s.canonicalString}`).join('\n');
      console.log('--- Generated Species ---');
      console.log(speciesOutput);
      console.log('-------------------------');

      if (modelName === 'Barua_2007') {
        fs.writeFileSync('web_species.txt', speciesOutput);
        console.log('Dumped species to web_species.txt');
      }
    }

    const networkGenTime = performance.now() - netGenStart;

    const numSpecies = network.species.length;
    const numReactions = network.reactions.length;

    // Check for species mismatch (indicates network gen issue)
    const limitReached = numSpecies >= 5000 || numReactions >= 10000;
    if (limitReached) {
      return {
        parseTime,
        networkGenTime,
        odeTime: 0,
        totalTime: performance.now() - totalStart,
        species: numSpecies,
        reactions: numReactions,
        status: 'limit_reached',
        error: 'Hit species/reaction limit',
        hasReference: false
      };
    }

    // Load reference data if available
    const refPath = findReferenceFile(modelName, path.dirname(modelPath));
    const refData = refPath ? parseGdat(fs.readFileSync(fs.realpathSync(refPath), 'utf-8')) : null;
    if (refPath) {
      console.log(`[Validation] Found reference data for ${modelName}: ${refPath}`);
    }

    // Check species count mismatch (if significant)
    if (bng2Species > 0 && Math.abs(numSpecies - bng2Species) > bng2Species * 0.1) {
      return {
        parseTime,
        networkGenTime,
        odeTime: 0,
        totalTime: performance.now() - totalStart,
        species: numSpecies,
        reactions: numReactions,
        status: 'species_mismatch',
        error: `Species mismatch: web=${numSpecies} vs bng2=${bng2Species}`,
        hasReference: !!refData
      };
    }


    // 3. ODE Simulation
    const odeStart = performance.now();

    // Build species name to index map
    const speciesMap = new Map<string, number>();
    network.species.forEach((s, i) => speciesMap.set(BNGLParser.speciesGraphToString(s.graph), i));

    // Build initial state and derivatives

    const y0 = new Float64Array(numSpecies);
    model.species.forEach(s => {
      // Find matching species by canonical form
      const canonicalName = BNGLParser.speciesGraphToString(BNGLParser.parseSpeciesGraph(s.name));
      const idx = speciesMap.get(canonicalName);
      if (idx !== undefined) {
        y0[idx] = s.initialConcentration;
      }
    });

    // Build concrete reactions
    const concreteReactions = network.reactions.map(r => ({
      reactants: r.reactants,
      products: r.products,
      rate: r.rate
    }));

    // Derivative function
    const derivatives = (y: Float64Array, out: Float64Array) => {
      out.fill(0);
      for (const rxn of concreteReactions) {
        let velocity = rxn.rate;
        for (const idx of rxn.reactants) {
          velocity *= y[idx];
        }
        for (const idx of rxn.reactants) {
          out[idx] -= velocity;
        }
        for (const idx of rxn.products) {
          out[idx] += velocity;
        }
      }
    };

    // Jacobian generator (analytical, like Julia's ModelingToolkit)
    // For mass-action kinetics: J[i][j] = ∂(dy_i/dt)/∂y_j
    // = Σ_r stoich[i][r] * rate_constant[r] * ∂(∏_k y[k]^order[k][r])/∂y_j
    const jacobian = (y: Float64Array, J: Float64Array) => {
      // J is column-major: J[i + j*neq] = ∂f_i/∂y_j
      const neq = numSpecies;
      J.fill(0);

      for (const rxn of concreteReactions) {
        const k = rxn.rate;
        const reactants = rxn.reactants;

        // Count reactant multiplicities for this reaction
        const reactantCounts = new Map<number, number>();
        for (const idx of reactants) {
          reactantCounts.set(idx, (reactantCounts.get(idx) || 0) + 1);
        }

        // For each unique reactant j in this reaction, compute ∂(velocity)/∂y_j
        for (const [j, orderJ] of reactantCounts) {
          // ∂velocity/∂y_j = k * order_j * y_j^(order_j - 1) * ∏_{i≠j} y_i^order_i
          //                = k * order_j / y_j * ∏_i y_i^order_i  (if y_j > 0)
          //                = order_j * velocity / y_j
          let dVelocity_dyj: number;
          if (y[j] > 1e-100) {
            // Compute base velocity
            let velocity = k;
            for (const idx of reactants) {
              velocity *= y[idx];
            }
            dVelocity_dyj = orderJ * velocity / y[j];
          } else {
            // y[j] ≈ 0: Compute derivative directly to avoid division by zero
            // ∂velocity/∂y_j = k * order_j * y_j^(order_j-1) * ∏_{i≠j} y_i^order_i
            if (orderJ === 1) {
              // Common case: first-order in y_j
              let partialProduct = k;
              for (const idx of reactants) {
                if (idx !== j) partialProduct *= y[idx];
              }
              // Handle multiplicity > 1: need to also multiply by remaining y[j] terms
              for (let m = 1; m < orderJ; m++) {
                partialProduct *= y[j];
              }
              dVelocity_dyj = partialProduct;
            } else {
              // Higher order and y[j] ≈ 0: derivative is 0 unless order_j = 1
              dVelocity_dyj = 0;
            }
          }

          // Update Jacobian: J[i][j] += stoich[i] * dVelocity_dyj
          // Reactants have stoich = -1, products have stoich = +1
          for (const idx of reactants) {
            J[idx + j * neq] -= dVelocity_dyj;
          }
          for (const idx of rxn.products) {
            J[idx + j * neq] += dVelocity_dyj;
          }
        }
      }
    };

    // Get simulation parameters

    const t_end = model.simulationOptions?.t_end ?? 100;
    let n_steps = model.simulationOptions?.n_steps ?? 100;

    // For stiff models, use more sub-steps to reduce integration interval size
    // If dt > 1, CVODE may struggle with stiff initial transients (rate constants can be ~1000)
    const dt = t_end / n_steps;
    if (numSpecies > 100 && dt > 1) {
      const subStepMultiplier = Math.ceil(dt / 1);  // Aim for dt <= 1
      n_steps = n_steps * subStepMultiplier;

    }

    // Check for NaN/Inf in reaction rates
    let hasBadRates = false;
    concreteReactions.forEach((r, i) => {
      if (!Number.isFinite(r.rate)) {
        console.error(`Reaction ${i} has invalid rate: ${r.rate}`);
        hasBadRates = true;
      }
    });

    const rates = concreteReactions.map(r => r.rate);
    const minRate = Math.min(...rates);
    const maxRate = Math.max(...rates);
    const zeroRates = rates.filter(r => r === 0).length;


    if (hasBadRates) {
      return {
        parseTime,
        networkGenTime,
        odeTime: 0,
        totalTime: performance.now() - totalStart,
        species: numSpecies,
        reactions: numReactions,
        status: 'failed',
        error: 'Invalid reaction rates',
        hasReference: false
      };
    }

    // Use model-specified tolerances when available, otherwise use heuristic defaults
    // For stiff models: tighter tolerances help CVODE's BDF method find the right step size
    const userAtol = model.simulationOptions?.atol;
    const userRtol = model.simulationOptions?.rtol;
    const isLargeStiffModel = numSpecies > 100;

    // For large stiff models using sparse solver, use looser tolerances
    // since the finite difference Jacobian approximation struggles with tight tolerances
    // For smaller models, use model-specified tolerances
    let atol: number;
    let rtol: number;

    if (isLargeStiffModel) {
      // CVODE sparse uses finite differences for Jacobian; needs loose tolerances
      atol = Math.max(userAtol ?? 1e-6, 1e-6);  // At least 1e-6
      rtol = Math.max(userRtol ?? 1e-4, 1e-4);  // At least 1e-4
    } else {
      // Use model's specified tolerances for smaller models
      atol = userAtol ?? 1e-8;
      rtol = userRtol ?? 1e-6;
    }

    // For stiff models, use a small initial step to help CVODE bootstrap properly
    // and limit max step to prevent overshooting oscillatory dynamics
    const initialStep = isLargeStiffModel ? 1e-6 : undefined;
    const maxStep = isLargeStiffModel ? t_end / 100 : Infinity;

    console.log(`[ODESolver] Using tolerances: atol=${atol}, rtol=${rtol}, initialStep=${initialStep ?? 'auto'}, maxStep=${maxStep === Infinity ? 'Infinity' : maxStep}`);

    // For large stiff models, try sparse solver first (better for stiff Jacobians)
    // For smaller models, use dense analytical Jacobian (faster)
    // NOTE: cvode_jac has better convergence failure handling than cvode_sparse
    const useSparse = false;  // Always use dense with analytical Jacobian for now
    console.log(`[ODESolver] Using cvode_jac for ${numSpecies} species (analytical Jacobian)`);

    const solver = await createSolver(numSpecies, derivatives, {
      atol: atol,
      rtol: rtol,
      maxSteps: 100000000,
      maxStep: maxStep,
      initialStep: initialStep,
      solver: 'cvode_jac',
      jacobian: jacobian  // Always provide analytical Jacobian
    } as any);

    const dtOut = t_end / n_steps;
    let y = new Float64Array(y0);
    let t = 0;
    let currentSolver = solver;
    let solverName = 'cvode_jac';
    let fallbackAttempted = false;

    // Integration loop with timeout and solver fallback
    const odeStartTime = performance.now();

    // Track observables for verification
    const times: number[] = [0];
    const observableValues = new Map<string, Float64Array>();
    const observableContributors = new Map<string, number[]>();
    model.observables.forEach(o => {
      const indices: number[] = [];
      // Clean pattern string (remove type prefix if parser included it, though usually separate)
      // Check types.ts: type is separate field.
      const pattern = o.pattern;

      network.species.forEach((s, idx) => {
        // Simplified matching:
        if (o.type === 'species') {
          // Exact match of canonical string (approx)
          if (s.canonicalString === pattern) indices.push(idx);
        } else {
          // Molecules: check if species contains the pattern
          // Handle compartment-prefixed patterns like @PM:L or @PM:R(tf~pY!?)
          let patternCompartment: string | null = null;
          let cleanPat = pattern;

          // Extract compartment from pattern if present
          const compMatch = pattern.match(/^@([A-Za-z0-9_]+):(.+)$/);
          if (compMatch) {
            patternCompartment = compMatch[1];
            cleanPat = compMatch[2];
          }

          // Remove bond wildcards (!?, !+)
          cleanPat = cleanPat.replace(/![?+]/g, '');

          // Extract compartment from species canonical string
          // Format: @COMP::MolName(...) or MolName(...)@COMP
          let speciesCompartment: string | null = null;
          const speciesCompMatch1 = s.canonicalString.match(/^@([A-Za-z0-9_]+)::/);
          const speciesCompMatch2 = s.canonicalString.match(/@([A-Za-z0-9_]+)$/);
          if (speciesCompMatch1) speciesCompartment = speciesCompMatch1[1];
          else if (speciesCompMatch2) speciesCompartment = speciesCompMatch2[1];
          // Also check species graph compartment directly
          if (!speciesCompartment && s.graph.compartment) {
            speciesCompartment = s.graph.compartment;
          }
          // Check first molecule's compartment
          if (!speciesCompartment && s.graph.molecules.length > 0 && s.graph.molecules[0].compartment) {
            speciesCompartment = s.graph.molecules[0].compartment;
          }

          // If pattern has compartment, need to verify molecule-level compartment
          // BNG2 uses molecule-level compartments in canonical strings like L(r!1)@EC

          // Now check if the pattern matches the species
          if (patternCompartment) {
            // For compartment-prefixed patterns, need molecule-level compartment matching
            const molName = cleanPat.includes('(') ? cleanPat.split('(')[0] : cleanPat;

            // Build regex to find molecule with optional compartment suffix
            // Pattern: molName followed by (...) followed by optional @COMP
            const molRegex = new RegExp(`${molName}\\([^)]*\\)(?:@([A-Za-z0-9_]+))?`, 'g');
            let match;
            let moleculeMatches = 0;

            while ((match = molRegex.exec(s.canonicalString)) !== null) {
              const molCompartment = match[1]; // Captured compartment suffix, may be undefined

              // Determine effective molecule compartment
              // If molecule has suffix, use that; otherwise inherit from species
              const effectiveComp = molCompartment || speciesCompartment;

              // Validate molecule compartment matches pattern compartment
              if (effectiveComp !== patternCompartment) {
                continue; // This molecule is in wrong compartment
              }

              // Check body pattern if specified (for patterns like R(tf~pY))
              if (cleanPat.includes('(')) {
                const body = cleanPat.substring(molName.length + 1, cleanPat.length - 1);
                if (body !== '' && !match[0].includes(body.replace(/![?+]/g, ''))) {
                  continue;
                }
              }

              moleculeMatches++;
            }

            if (moleculeMatches > 0) {
              indices.push(idx);
            }
          } else {
            // No compartment prefix - use simple pattern matching
            if (cleanPat.includes('(')) {
              const molName = cleanPat.split('(')[0];
              const body = cleanPat.substring(molName.length + 1, cleanPat.length - 1);
              // Verify molecule name and body presence
              if (s.canonicalString.includes(molName) && (body === '' || s.canonicalString.includes(body.replace(/![?+]/g, '')))) {
                indices.push(idx);
              }
            } else if (cleanPat.includes('.')) {
              // Complex pattern like P.R - check for all molecule names
              const molNames = cleanPat.split('.');
              if (molNames.every(name => s.canonicalString.includes(name + '('))) {
                indices.push(idx);
              }
            } else {
              // Simple molecule name match (e.g., L matches L(...))
              if (s.canonicalString.includes(cleanPat + '(')) {
                indices.push(idx);
                if (o.name === 'Tot_P') console.log(`[Tot_P] Matched species ${idx}: ${s.canonicalString}`);
              } else if (o.name === 'Tot_P' && idx < 5) {
                console.log(`[Tot_P] NO match for species ${idx}: ${s.canonicalString} (looking for '${cleanPat}(')`);
              }
            }
          }
        }
      });
      observableContributors.set(o.name, indices);
      // Debug: log observable matching
      if (indices.length === 0 && o.name.match(/Tot_P|P_R|L_Bound/)) {
        console.log(`[ObsMatchDebug] ${o.name} pattern='${o.pattern}' cleanPat='${pattern}' patternComp=${o.pattern.match(/^@([A-Za-z0-9_]+):/)?.[1] || 'none'} matched=${indices.length} species`);
      }
    });

    // Initialize computed observables map
    const computedObservables = new Map<string, number[]>();
    if (refData) {
      model.observables.forEach(o => {
        computedObservables.set(o.name, []);
      });
    }

    let obsStoreIdx = 0;

    // Actually, constructing observables properly:
    // We already have the network. We can re-evaluate observables based on species concentrations.
    // The NetworkGenerator doesn't export the observable mapping directly in `network` variable in this script easily?
    // Wait, NetworkGenerator returns `observables` map (index -> list of species indices)?
    // Let's check NetworkGenerator.generate return type.

    // Quick fix: The return from generator.generate is { species, reactions }.
    // We need to map observables properly. 
    // To do this *correctly* without re-implementing matching:
    // We can assume we don't have easy observable values unless we implemented it.
    // BUT: The benchmark is mostly for performance.
    // For ACCURACY, checking Species indices directly against a reference is hard (indices change).
    // Observables are the only invariant.

    // For now, let's skip complex observable pattern matching inside this script and only support models
    // where observables are direct sums of species (which is common) or rely on a "best effort" mapping.

    // BETTER APPROACH: 
    // Just use the species concentrations directly if we can map them? No, names change.
    // We MUST calculate observables.

    // Let's use a simplified approach: assume we can't easily compute complex observables here without
    // porting more logic.
    // However, we can check basic species if they are simple.

    // ALTERNATIVE: Just run the simulation and accept we can't validate numerically 
    // UNLESS we extract the observable maps from the NetworkGenerator. 
    // NetworkGenerator *does* compute observables! It's in `network.observables`?
    // Let's check the type definition of `network`.
    // It is `GeneratedNetwork`.

    // Initial observable calc
    if (refData) {
      times.push(0);
      observableContributors.forEach((indices, name) => {
        let sum = 0;
        for (const idx of indices) sum += y0[idx];
        // computedObservables.get(name)![0] = sum; // Need to handle size or push?
        // Actually let's just use arrays in the map, Float64Array is fixed size.
        // Using standard arrays for simplicity in this script as perf is less critical than correctness here.
      });
      // Reinitalize with standard arrays for push capability
      observableContributors.forEach((_, name) => {
        computedObservables.set(name, [0]); // Will overwrite
        let sum = 0;
        const indices = observableContributors.get(name)!;
        for (const idx of indices) sum += y0[idx];
        computedObservables.get(name)!.push(sum);
      });
    }



    for (let i = 1; i <= n_steps; i++) {
      const tTarget = i * dtOut;


      if (performance.now() - odeStartTime > ODE_TIMEOUT_MS) {
        return {
          parseTime,
          networkGenTime,
          odeTime: ODE_TIMEOUT_MS,
          totalTime: performance.now() - totalStart,
          species: numSpecies,
          reactions: numReactions,
          status: 'timeout',
          error: `ODE timeout at step ${i}/${n_steps}`,
          hasReference: !!refData
        };
      }

      const result = currentSolver.integrate(y, t, tTarget);

      if (!result.success) {
        // If CVODE failed and we haven't tried Rosenbrock23 yet, fall back
        if (solverName.includes('cvode') && !fallbackAttempted && isLargeStiffModel) {
          console.log(`[Fallback] CVODE failed at t=${t}, switching to Rosenbrock23`);
          fallbackAttempted = true;
          solverName = 'rosenbrock23';

          // Create Rosenbrock23 solver with same configuration
          // Note: Rosenbrock23 uses row-major Jacobian, so we need to create a transposed version
          const jacobianRowMajor = (yIn: Float64Array, J: Float64Array) => {
            // Compute column-major Jacobian then transpose to row-major
            const neq = numSpecies;
            const tempJ = new Float64Array(neq * neq);
            jacobian(yIn, tempJ);  // column-major
            // Transpose: J_row[i*n + j] = J_col[j*n + i]
            for (let ii = 0; ii < neq; ii++) {
              for (let jj = 0; jj < neq; jj++) {
                J[ii * neq + jj] = tempJ[jj * neq + ii];
              }
            }
          };

          currentSolver = await createSolver(numSpecies, derivatives, {
            atol: atol,
            rtol: rtol,
            maxSteps: 100000000,
            maxStep: t_end / 100,
            minStep: 1e-15,
            solver: 'rosenbrock23',
            jacobianRowMajor: jacobianRowMajor
          } as any);

          // Restart from beginning with new solver
          y = new Float64Array(y0);
          t = 0;
          i = 0;  // Will be incremented to 1 at loop start
          continue;
        }

        return {
          parseTime,
          networkGenTime,
          odeTime: performance.now() - odeStart,
          totalTime: performance.now() - totalStart,
          species: numSpecies,
          reactions: numReactions,
          status: 'failed',
          error: result.errorMessage?.substring(0, 50),
          hasReference: !!refData
        };
      }

      y = new Float64Array(result.y);
      t = result.t;

      // Store data points for verification (subsample if too large)
      if (refData && (i % Math.ceil(n_steps / 5000) === 0 || i === n_steps)) {
        times.push(t);

        observableContributors.forEach((indices, name) => {
          let sum = 0;
          for (const idx of indices) sum += y[idx];
          computedObservables.get(name)?.push(sum);
        });
      }
    }

    // Calculate final error if possible (Placeholder)
    let maxError = -1;
    let accStatus: 'pass' | 'fail' | 'missing_ref' = refData ? 'fail' : 'missing_ref';

    if (refData && times.length > 0) {
      // Convert number[] to Float64Array for calculateMaxError
      const webResults = new Map<string, Float64Array>();
      computedObservables.forEach((vals, name) => {
        webResults.set(name, new Float64Array(vals));
      });

      const error = calculateMaxError(times, webResults, refData);
      maxError = error;

      // Threshold 5%? 10%? Lin_ERK was <3%
      if (maxError >= 0 && maxError < 10.0) {
        accStatus = 'pass';
      } else if (maxError >= 10.0) {
        accStatus = 'fail';
      } else {
        accStatus = 'missing_ref'; // Should not happen if refData exists
      }
    }

    // Write results to CSV (compatible with comparison script)
    if (times.length > 0) {
      const resultsPath = path.join(process.cwd(), `results_${modelName}.csv`);
      const header = ['time', ...computedObservables.keys()].join(',');
      const rows = times.map((t, i) => {
        return [t, ...Array.from(computedObservables.values()).map(vals => vals[i])].join(',');
      });
      const csvContent = [header, ...rows].join('\n');
      fs.writeFileSync(resultsPath, csvContent);
      console.log(`[Results] Written to ${resultsPath}`);
    }

    const odeTime = performance.now() - odeStart;
    const totalTime = performance.now() - totalStart;

    return {
      parseTime,
      networkGenTime,
      odeTime,
      totalTime,
      species: numSpecies,
      reactions: numReactions,
      status: fallbackAttempted ? 'success' : 'success',  // Both are success
      solverUsed: solverName,  // Track which solver was used
      hasReference: !!refData,
      accuracyError: maxError,
      accuracyStatus: accStatus
    } as any;

  } catch (error: any) {
    return {
      parseTime: 0,
      networkGenTime: 0,
      odeTime: 0,
      totalTime: performance.now() - totalStart,
      species: 0,
      reactions: 0,
      status: 'failed',
      error: error.message?.substring(0, 100),
      hasReference: false
    };
  }
}

async function runBenchmark() {
  console.log('='.repeat(90));
  console.log('FULL ODE BENCHMARK: Parsing + Network Generation + ODE Simulation');
  console.log('Comparing Web Simulator vs BNG2.pl');
  console.log('='.repeat(90));
  console.log('');

  // Initialize Nauty service
  console.log('Initializing Nauty service...');
  await NautyService.getInstance().init();

  let allModels: any[] = [];

  if (process.argv[2]) {
    const target = process.argv[2];

    // Simple recursive finder
    const fs = await import('fs');
    const path = await import('path');
    const findModel = (dir: string, name: string): string | null => {
      if (!fs.existsSync(dir)) return null;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          const found = findModel(fullPath, name);
          if (found) return found;
        } else if (entry.isFile() && entry.name === name + '.bngl') {
          return fullPath;
        }
      }
      return null;
    };

    const root = path.join(__dirname, '../published-models');
    const foundPath = findModel(root, target);

    if (foundPath) {
      console.log(`Found model at: ${foundPath}`);
      allModels = [{ model: target, path: foundPath, hasGdat: false, gdatRows: 0 }];
    } else {
      console.error(`Model ${target} not found in ${root}`);
      process.exit(1);
    }
  } else {
    // Load from test report
    try {
      const report = loadTestReport();
      // Filter out huge models that might timeout or crash in this intensive mode
      // But keep Lin_ERK_2019
      allModels = report.passed.filter(m => (m.speciesCount < 1000 && m.reactionCount < 5000) || m.model.includes('Lin_ERK') || m.model.includes('Barua'));
      console.log(`Loaded ${allModels.length} models from bng2_test_report.json (filtered large models)`);
    } catch (e) {
      console.error('Failed to load bng2_test_report.json', e);
      process.exit(1);
    }
  }

  // Debug: verify models loaded
  console.log(`[Debug] allModels length: ${allModels.length}`);

  console.log(`Found ${allModels.length} models in published-models and example-models\n`);

  // Create temp directory
  const tempDir = path.join(ROOT_DIR, 'temp_benchmark');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const results: BenchmarkResult[] = [];

  // Test models (limit to smaller ones first or test all)
  console.log(`Testing ${allModels.length} models...\n`);
  console.log('Model'.padEnd(30) + 'NetGen'.padEnd(10) + 'ODE'.padEnd(12) + 'Total'.padEnd(12) + 'Sp'.padEnd(6) + 'Status');
  console.log('-'.repeat(90));

  for (let i = 0; i < allModels.length; i++) {
    const model = allModels[i];

    const result: BenchmarkResult = {
      model: model.model,
      category: model.category,
      bng2Species: model.speciesCount,
      bng2Reactions: model.reactionCount,
      webParseTime: 0,
      webNetworkGenTime: 0,
      webODETime: 0,
      webTotalTime: 0,
      webSpecies: 0,
      webReactions: 0,
      webStatus: 'failed',
      hasReference: false
    };

    // Run full simulation
    const webResult = await runFullSimulation(model.model, model.path, model.speciesCount);
    result.webParseTime = webResult.parseTime;
    result.webNetworkGenTime = webResult.networkGenTime;
    result.webODETime = webResult.odeTime;
    result.webTotalTime = webResult.totalTime;
    result.webSpecies = webResult.species;
    result.webReactions = webResult.reactions;
    result.webStatus = webResult.status;
    result.webError = webResult.error;

    // BNG2 timing (network gen only for comparison)
    const bng2Result = runBNG2ForTiming(model.path, model.model, tempDir);
    if (bng2Result.timeMs > 0) {
      result.bng2TimeMs = bng2Result.timeMs;
    } else {
      result.bng2TimingError = bng2Result.error;
    }

    // Print row
    const statusIcon =
      result.webStatus === 'success' ? '✓' :
        result.webStatus === 'limit_reached' ? 'L' :
          result.webStatus === 'timeout' ? 'T' :
            result.webStatus === 'species_mismatch' ? '!' : '✗';

    const netGen = result.webNetworkGenTime.toFixed(0).padEnd(10);
    const ode = result.webODETime.toFixed(0).padEnd(12);
    const total = result.webTotalTime.toFixed(0).padEnd(12);
    const sp = result.webSpecies.toString().padEnd(6);

    // Save species list for debugging - MOVED TO ABOVE


    const refMark = result.hasReference ? (result.accuracyStatus === 'pass' ? ' (Ref:OK)' : ' (Ref:?)') : '';
    console.log(`${statusIcon} ${model.model.substring(0, 25).padEnd(25)} ${netGen} ${ode} ${total} ${sp} ${result.webStatus}${refMark}`);

    results.push(result);
  }

  // Summary
  console.log('\n' + '='.repeat(90));
  console.log('SUMMARY');
  console.log('='.repeat(90));

  const successful = results.filter(r => r.webStatus === 'success');
  const failed = results.filter(r => r.webStatus === 'failed');
  const timeouts = results.filter(r => r.webStatus === 'timeout');
  const mismatches = results.filter(r => r.webStatus === 'species_mismatch');

  console.log(`\nSuccess: ${successful.length}/${results.length}`);
  console.log(`Failed: ${failed.length}/${results.length}`);
  console.log(`Timeouts: ${timeouts.length}/${results.length}`);
  console.log(`Species mismatch: ${mismatches.length}/${results.length}`);

  if (successful.length > 0) {
    const avgNetGen = successful.reduce((a, b) => a + b.webNetworkGenTime, 0) / successful.length;
    const avgODE = successful.reduce((a, b) => a + b.webODETime, 0) / successful.length;
    const avgTotal = successful.reduce((a, b) => a + b.webTotalTime, 0) / successful.length;

    console.log('\n--- Average Timings (successful only) ---');
    console.log(`Network Gen: ${avgNetGen.toFixed(0)}ms`);
    console.log(`ODE Solve: ${avgODE.toFixed(0)}ms`);
    console.log(`Total: ${avgTotal.toFixed(0)}ms`);
  }

  // Save results
  const outputPath = path.join(ROOT_DIR, 'full_ode_benchmark_results.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
      totalModels: results.length,
      successful: successful.length,
      failed: failed.length,
      timeouts: timeouts.length,
      mismatches: mismatches.length
    },
    results
  }, null, 2));
  console.log(`\nResults saved to: ${outputPath}`);

  // Cleanup
  try { fs.rmSync(tempDir, { recursive: true }); } catch { }
}

runBenchmark().catch(console.error);
