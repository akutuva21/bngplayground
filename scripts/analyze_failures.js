
const fs = require('fs');
const path = require('path');

const jsonPath = 'artifacts/SESSION_2026_01_05_web_output_parity/compare_results.after_refs.json';
const webOutputDir = 'web_output';
const constantsPath = 'constants.ts'; // To map filenames if needed, but JSON has names.

// 1. Parse JSON for missingReference
const report = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const missingRefs = report.results
  .filter(r => r.status === 'missingReference')
  .map(r => r.model);

console.log('--- Missing References (Generate these) ---');
missingRefs.forEach(m => console.log(m));

// 2. Identify Execution Failures (Models in constants.ts but NO CSV in web_output)
// Note: This requires knowing ALL 108 models. 
// We can infer them from the JSON results + potentially missed ones.
// But the JSON *lists* execution failures as "results" with potentially "error" status if they produced partial output?
// Or maybe they are missing from JSON entirely?
// Let's assume JSON covers all 108 verification candidates.
// If valid models crashed, they might be absent from JSON?
// Let's check report.results.length.
console.log(`\nTotal Results in JSON: ${report.results.length}`);

// We can check web_output file count.
const webFiles = fs.readdirSync(webOutputDir).filter(f => f.endsWith('.csv'));
console.log(`\nWeb Output CSVs: ${webFiles.length}`);

// If 119 successes (CSV files), and 128 processed...
// The 9 failures might be missing.
// I will just list the missingRefs for now to unblock that.
