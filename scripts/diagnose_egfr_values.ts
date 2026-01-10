
import { simulate } from '../services/bnglWorker';
import { parseBNGLStrict } from '../src/parser/BNGLParserWrapper';
import * as fs from 'fs';

async function diagnoseEgfr() {
    const bnglPath = './public/models/egfr_simple.bngl';
    const content = fs.readFileSync(bnglPath, 'utf8');
    const model = parseBNGLStrict(content);

    console.log('--- DIAGNOSING egfr_simple ---');

    // Simulate all phases
    const results = await simulate(1, model, { method: 'ode', t_end: 1200, n_steps: 500 });

    // The results.data contains the output chain.
    // We want to see even the intermediate phases.
    // I'll modify simulate to return ALL phases data for debugging if needed, 
    // but here I can just see the first and last points.

    console.log('Result Rows:', results.data.length);
    console.log('First Row:', results.data[0]);
    console.log('Middle Row (250):', results.data[250]);
    console.log('Last Row:', results.data[results.data.length - 1]);

    // Check specific observables
    const lastRow = results.data[results.data.length - 1];
    console.log(`Grb2Sos1 at t=1200: web=${lastRow.Grb2Sos1}`);
}

diagnoseEgfr().catch(console.error);
