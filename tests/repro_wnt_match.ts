
import { countPatternMatches } from '../services/parity/PatternMatcher';
import { BNGLParser } from '../src/services/graph/core/BNGLParser';

const runTest = (pat: string, spec: string) => {
    console.log(`Checking match: '${pat}' vs '${spec}'`);
    const count = countPatternMatches(spec, pat);
    console.log(`Result: ${count}`);

    // Debug graph structure
    const pGraph = BNGLParser.parseSpeciesGraph(pat);
    const sGraph = BNGLParser.parseSpeciesGraph(spec);
    console.log('Pat Graph:', JSON.stringify(pGraph, null, 2));
    console.log('Spec Graph:', JSON.stringify(sGraph, null, 2));
};

console.log('--- Wnt Test ---');
runTest('Wnt(state~on)', 'Wnt(state~on)');
console.log('--- BetaCatenin Test ---');
runTest('BetaCatenin(loc~nuc)', 'BetaCatenin(loc~nuc)');
