
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parseBNGL } from '../services/parseBNGL.ts';
import { NetworkGenerator } from '../src/services/graph/NetworkGenerator.ts';
import { BNGLParser } from '../src/services/graph/core/BNGLParser.ts';
import { createSolver } from '../services/ODESolver.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const filePath = path.join(__dirname, '../published-models/literature/Cheemalavagu_JAK_STAT.bngl');
    console.log(`Checking ${filePath}...`);
    
    const code = fs.readFileSync(filePath, 'utf-8');
    const model = parseBNGL(code);
    
    // Check parameters
    console.log('L1_0:', model.parameters['L1_0']);
    console.log('L2_0:', model.parameters['L2_0']);
    
    // Generate Network
    const seedSpecies = model.species.map(s => BNGLParser.parseSpeciesGraph(s.name));
    const parametersMap = new Map(Object.entries(model.parameters).map(([k, v]) => [k, Number(v as number)]));
    const observablesSet = new Set<string>((model.observables || []).map(o => o.name));

    const rules = model.reactionRules.flatMap(r => {
        let rate: number = 0;
        try { rate = BNGLParser.evaluateExpression(r.rate, parametersMap, observablesSet); } catch { }
        return [BNGLParser.parseRxnRule(`${r.reactants.join('+')}->${r.products.join('+')}`, rate)];
    }); // Simplified for speed (unidirectional only for calc check)

    console.log('Generating network...');
    const generator = new NetworkGenerator({ maxSpecies: 100, maxReactions: 100, maxIterations: 5, maxStoich: 100 });
    const network = await generator.generate(seedSpecies, rules, () => {});
    
    console.log(`Generated ${network.species.length} species, ${network.reactions.length} reactions.`);
    
    // Calculate initial activity (derivatives at t=0)
    // We don't need full solver, just dydt at y0.
    
    const concreteReactions = network.reactions.map(r => ({
        reactants: r.reactants,
        products: r.products,
        rate: r.rate
    }));
    
    const activeReactions = concreteReactions.filter(r => r.rate > 0);
    console.log(`Reactions with rate > 0: ${activeReactions.length}`);
    
    // Check if any reaction can fire from y0
    // Note: y0 for L1 is 0.
    
    // Count effective firing
    let firingCount = 0;
    // Map species names to indices to set y0
    // ... (simplified check)
    
    if (model.parameters['L1_0'] == 0 && model.parameters['L2_0'] == 0) {
        console.log('FAIL: Ligand concentrations are 0. Model is expected to be static.');
    } else {
        console.log('PASS: Ligands present.');
    }
}

main();
