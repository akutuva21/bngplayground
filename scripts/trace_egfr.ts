
import { parseBNGLStrict } from '../src/parser/BNGLParserWrapper';
import * as fs from 'fs';
import * as path from 'path';

// This is a minimal mock of the worker simulation logic to trace egfr_simple
async function traceEgfr() {
    const bnglPath = './public/models/egfr_simple.bngl';
    const content = fs.readFileSync(bnglPath, 'utf8');
    const model = parseBNGLStrict(content);

    console.log('Model Name:', model.name);
    const phases = model.simulationPhases || [];
    console.log('Phases:', phases.length);
    phases.forEach((p, i) => {
        console.log(`Phase ${i}: method=${p.method}, t_end=${p.t_end}, n_steps=${p.n_steps}, continue=${p.continue}, steady_state=${p.steady_state}`);
    });

    console.log('Concentration Changes:');
    (model.concentrationChanges || []).forEach(c => {
        console.log(`  after phase ${c.afterPhaseIndex}: ${c.species} = ${c.value}`);
    });

    console.log('\n--- NETWORK EXPANSION ---');
    const { generateExpandedNetwork } = await import('../services/bnglWorker');
    const result = await generateExpandedNetwork(1, model);
    console.log(`Species found: ${result.species.length}`);
    result.species.forEach((s, i) => {
        console.log(`  [${i+1}] ${s.name}`);
    });

    console.log('\n--- REACTIONS ---');
    result.reactions.forEach((r, i) => {
        const reactants = r.reactants.map(ri => ri + 1).join(',');
        const products = r.products.map(pi => pi + 1).join(',');
        console.log(`  [${i+1}] ${reactants} -> ${products} rate=${r.rateConstant}`);
    });
}

traceEgfr();
