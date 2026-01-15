
import { countPatternMatches } from '../services/parity/PatternMatcher';

console.log('--- Viral Sensing Match Repro ---');

const cases = [
    {
        name: 'RIGI Valid Match',
        species: 'RIGI(state~active)',
        pattern: 'RIGI(state~active)',
        expected: 1
    },
    {
        name: 'MAVS Valid Match',
        species: 'MAVS(state~on)',
        pattern: 'MAVS(state~on)',
        expected: 1
    },
    {
        name: 'IFNB Valid Match',
        species: 'IFNB(state~on)',
        pattern: 'IFNB(state~on)',
        expected: 1
    },
    {
        name: 'Complex RIGI (with Compartment)',
        species: '@EC:RIGI(state~active)',
        pattern: '@EC:RIGI(state~active)',
        expected: 1
    },
    {
        name: 'Mismatch State',
        species: 'RIGI(state~inactive)',
        pattern: 'RIGI(state~active)',
        expected: 0
    }
];

let failed = 0;
for (const c of cases) {
    const result = countPatternMatches(c.species, c.pattern);
    const passed = result === c.expected;
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${c.name}: Expected ${c.expected}, Got ${result}`);
    if (!passed) failed++;
}

if (failed > 0) {
    console.error(`\n${failed} tests failing.`);
    process.exit(1);
} else {
    console.log('\nAll tests passed.');
}
