
import * as fs from 'fs';
import * as path from 'path';
import { parseBNGL } from '../services/parseBNGL';
import { BNGXMLWriter } from '../services/simulation/BNGXMLWriter';

async function run() {
    const modelPath = path.resolve('public/models/polymer.bngl');
    console.log(`Loading model: ${modelPath}`);
    const bnglContent = fs.readFileSync(modelPath, 'utf8');

    console.log('Parsing BNGL...');
    const model = parseBNGL(bnglContent);

    console.log('Generating BNGXML...');
    const xml = BNGXMLWriter.write(model);

    // Checks
    const checks = [
        {
            name: 'Species with compartment',
            regex: /<Species[^>]*compartment="c0"[^>]*>/,
            expected: true
        },
        {
            name: 'ReactantPattern with compartment',
            regex: /<ReactantPattern[^>]*compartment="c0"[^>]*>/,
            expected: true
        },
        {
            name: 'ProductPattern with compartment',
            regex: /<ProductPattern[^>]*compartment="c0"[^>]*>/,
            expected: true
        },
        {
            name: 'Molecule with compartment (if applicable)',
            // polymer.bngl molecules generally inherit compartment from species/pattern, 
            // but let's check if any explicit compartments were parsed.
            // In polymer.bngl: Molecules O0 @c0:A(...) -> pattern matches
            regex: /<Molecule[^>]*compartment="c0"[^>]*>/,
            expected: true
        }
    ];

    let passed = 0;
    let failed = 0;

    console.log('\n--- Verification Results ---');
    checks.forEach(check => {
        const match = check.regex.test(xml);
        if (match === check.expected) {
            console.log(`[PASS] ${check.name}`);
            passed++;
        } else {
            console.error(`[FAIL] ${check.name}`);
            console.error(`       Expected match: ${check.expected}, Found: ${match}`);
            failed++;
        }
    });

    console.log(`\nPassed: ${passed}, Failed: ${failed}`);

    // Output a snippet of XML for manual inspection
    console.log('\n--- XML Snippet (First 50 lines) ---');
    console.log(xml.split('\n').slice(0, 50).join('\n'));

    if (failed > 0) process.exit(1);
}

run().catch(console.error);
