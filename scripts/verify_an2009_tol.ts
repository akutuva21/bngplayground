
import * as fs from 'fs';
import * as path from 'path';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { BNGLexer } from '../src/parser/generated/BNGLexer.js';
import { BNGParser } from '../src/parser/generated/BNGParser.js';
import { BNGLVisitor } from '../src/parser/BNGLVisitor.js';

// Mock console to avoid noise
const originalConsole = console;

async function checkTolerances() {
    const bnglPath = path.join(process.cwd(), 'public', 'models', 'An_2009.bngl');
    console.log(`Reading ${bnglPath}`);
    const bnglContent = fs.readFileSync(bnglPath, 'utf8');

    // Parse
    const chars = CharStreams.fromString(bnglContent);
    const lexer = new BNGLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new BNGParser(tokens);
    const tree = parser.prog();

    const visitor = new BNGLVisitor();
    const model = visitor.visit(tree);

    console.log('Simulation Phases:');
    model.simulationPhases.forEach((phase, index) => {
        console.log(`Phase ${index + 1}:`);
        console.log(`  Suffix: ${phase.suffix}`);
        console.log(`  Atol: ${phase.atol}`);
        console.log(`  Rtol: ${phase.rtol}`);
        console.log(`  Steady State: ${phase.steady_state}`);
    });

    // Check if tolerances match 1e-12
    const phase1 = model.simulationPhases[0];
    const phase2 = model.simulationPhases[1];

    if (phase1.atol === 1e-12 && phase1.rtol === 1e-12) {
        console.log('SUCCESS: Phase 1 tolerances parsed correctly.');
    } else {
        console.error('FAILURE: Phase 1 tolerances incorrect.');
    }

    if (phase2.atol === 1e-12 && phase2.rtol === 1e-12) {
        console.log('SUCCESS: Phase 2 tolerances parsed correctly.');
    } else {
        console.error('FAILURE: Phase 2 tolerances incorrect.');
    }
}

checkTolerances().catch(console.error);
