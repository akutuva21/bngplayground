
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parseBNGL } from '../services/parseBNGL.ts';
import { NetworkGenerator } from '../src/services/graph/NetworkGenerator.ts';
import { BNGLParser } from '../src/services/graph/core/BNGLParser.ts';
import { createSolver } from '../services/ODESolver.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target specific models we want to verify
const TARGET_MODELS = [
    'published-models/literature/Dolan_2015.bngl',
    'published-models/literature/Lin_ERK_2019.bngl',
    'published-models/literature/Lin_TCR_2019.bngl',
    'published-models/literature/Lin_Prion_2019.bngl',
    'published-models/literature/Cheemalavagu_JAK_STAT.bngl'
];

async function checkModel(relativePath: string): Promise<{
  name: string;
  activeSpecies: number;
  status: 'PASS' | 'WARN' | 'FAIL';
  reason?: string;
}> {
  const filePath = path.join(__dirname, '..', relativePath);
  const name = path.basename(filePath);
  
  if (!fs.existsSync(filePath)) {
      return { name, activeSpecies: 0, status: 'FAIL', reason: 'File not found' };
  }

  const code = fs.readFileSync(filePath, 'utf-8');

  try {
      // 1. Parse
      const model = parseBNGL(code);
      if (model.reactionRules.length === 0) {
           return { name, activeSpecies: 0, status: 'FAIL', reason: 'No reaction rules found' };
      }

      // 2. Network Generation
      const seedSpecies = model.species.map(s => BNGLParser.parseSpeciesGraph(s.name));
      const parametersMap = new Map(Object.entries(model.parameters).map(([k, v]) => [k, Number(v as number)]));
      const observablesSet = new Set<string>((model.observables || []).map(o => o.name));

      const rules = model.reactionRules.flatMap(r => {
        let rate: number = 0;
        try { rate = BNGLParser.evaluateExpression(r.rate, parametersMap, observablesSet); } catch { }
        
        // Handle basic expressions if evaluate fails? 
        // For minimal verification, 0 rate is fatal.
        if (isNaN(rate)) rate = 0;

        let reverseRate: number = 0; // Default 0
        if (r.reverseRate) { try { reverseRate = BNGLParser.evaluateExpression(r.reverseRate, parametersMap, observablesSet); } catch { } }
         if (isNaN(reverseRate)) reverseRate = 0;

        const formatList = (list: string[]) => list.length > 0 ? list.join(' + ') : '0';
        const ruleStr = `${formatList(r.reactants)} -> ${formatList(r.products)}`;

        try {
            const forwardRule = BNGLParser.parseRxnRule(ruleStr, rate);
            if (r.constraints && r.constraints.length > 0) {
                 forwardRule.applyConstraints(r.constraints, (s) => BNGLParser.parseSpeciesGraph(s));
            }
            if (r.isBidirectional) {
                 const rvStr = `${formatList(r.products)} -> ${formatList(r.reactants)}`;
                 return [forwardRule, BNGLParser.parseRxnRule(rvStr, reverseRate)];
            }
            return [forwardRule];
        } catch { return []; }
      });

      const generator = new NetworkGenerator({
          maxSpecies: 1000,
          maxReactions: 2000,
          maxIterations: 20,
          maxStoich: 100
      });
      
      const network = await generator.generate(seedSpecies, rules, () => {});
      const numSpecies = network.species.length;

      if (numSpecies === 0) return { name, activeSpecies: 0, status: 'FAIL', reason: 'Zero species generated' };

      // 3. Prepare Simulation
      const speciesMap = new Map<string, number>();
      network.species.forEach((s, i) => speciesMap.set(BNGLParser.speciesGraphToString(s.graph), i));

      const y0 = new Float64Array(numSpecies);
      model.species.forEach(s => {
        const canonicalName = BNGLParser.speciesGraphToString(BNGLParser.parseSpeciesGraph(s.name));
        const idx = speciesMap.get(canonicalName);
        if (idx !== undefined) y0[idx] = s.initialConcentration;
      });

      const concreteReactions = network.reactions.map(r => ({
        reactants: r.reactants,
        products: r.products,
        rate: r.rate
      }));

      // Check for zero rates
      const activeRxns = concreteReactions.filter(r => r.rate > 0).length;
      if (activeRxns === 0) return { name, activeSpecies: 0, status: 'WARN', reason: 'No reactions with positive rate' };

      const derivatives = (y: Float64Array, out: Float64Array) => {
        out.fill(0);
        for (const rxn of concreteReactions) {
          let velocity = rxn.rate;
          for (const idx of rxn.reactants) velocity *= y[idx];
          for (const idx of rxn.reactants) out[idx] -= velocity;
          for (const idx of rxn.products) out[idx] += velocity;
        }
      };

      const solver = await createSolver(numSpecies, derivatives, {
          atol: 1e-6,
          rtol: 1e-3,
          maxSteps: 100000,
          solver: 'auto'
      } as any);

      const t_end = 100;
      const n_steps = 50;
      const dt = t_end / n_steps;
      
      let y = new Float64Array(y0);
      let t = 0;
      
      const activeSpeciesSet = new Set<number>();
      let maxDelta = 0;

      for (let i = 1; i <= n_steps; i++) {
          const tTarget = i * dt;
          const res = solver.integrate(y, t, tTarget);
          if (!res.success) throw new Error(res.errorMessage || 'Integration failed');
          y = new Float64Array(res.y);
          t = res.t;
          
          for(let k=0; k<numSpecies; k++) {
              const delta = Math.abs(y[k] - y0[k]);
              maxDelta = Math.max(maxDelta, delta);
              if (delta > 1e-9) activeSpeciesSet.add(k); // Lower threshold
          }
      }

      const activeCount = activeSpeciesSet.size;
      
      let status: 'PASS' | 'WARN' | 'FAIL' = 'PASS';
      let reason = '';
      if (activeCount === 0) {
          status = 'FAIL';
          reason = `Flat trajectories (0 species active). Max delta: ${maxDelta.toExponential(2)}`;
      } else if (activeCount < 2 && numSpecies > 2) {
           status = 'WARN';
           reason = `Low activity (<2 species changed). Max delta: ${maxDelta.toExponential(2)}`;
      }
      
      return { name, activeSpecies: activeCount, status, reason };

  } catch (e: any) {
      return { name, activeSpecies: 0, status: 'FAIL', reason: `Exception: ${e.message}` };
  }
}

async function main() {
  console.log(`Verifying ${TARGET_MODELS.length} literature models...`);

  const results = [];
  for (const relPath of TARGET_MODELS) {
      const res = await checkModel(relPath);
      results.push(res);
      const color = res.status === 'PASS' ? '\x1b[32m' : (res.status === 'WARN' ? '\x1b[33m' : '\x1b[31m');
      const reset = '\x1b[0m';
      console.log(`${color}[${res.status}] ${res.name}${reset}: ${res.reason || 'OK'} (Active Species: ${res.activeSpecies})`);
  }
}

main();
