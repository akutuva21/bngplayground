
const fs = require('fs');
const path = require('path');

const jsonPath = 'artifacts/SESSION_2026_01_05_web_output_parity/compare_results.after_refs.json';
const webOutputDir = 'web_output';

// 1. Parse JSON for missingReference
const report = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const missingRefs = report.results
    .filter(r => r.status === 'missing_reference')
    .map(r => r.model);

const statuses = new Set(report.results.map(r => r.status));
console.log('Available Statuses:', Array.from(statuses));


console.log('--- Missing References (Generate these) ---');
missingRefs.forEach(m => console.log(m));

console.log(`\nTotal Results in JSON: ${report.results.length}`);
const webFiles = fs.readdirSync(webOutputDir).filter(f => f.endsWith('.csv'));
console.log(`Web Output CSVs: ${webFiles.length}`);
