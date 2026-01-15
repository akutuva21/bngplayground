#!/usr/bin/env ts-node
import { execSync } from 'child_process';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { mkdtempSync, rmSync } from 'fs';
import { copyFileSync } from 'fs';

const exampleModelsDir = join(process.cwd(), 'example-models');
const bngTestOutputDir = join(process.cwd(), 'bng_test_output');
const bng2Script = 'C:\\Users\\Achyudhan\\anaconda3\\envs\\Research\\Lib\\site-packages\\bionetgen\\bng-win\\BNG2.pl';

if (!existsSync(bng2Script)) {
  console.error(`BNG2.pl not found at ${bng2Script}`);
  process.exit(1);
}

// Get all .bngl files from example-models
const modelFiles = readdirSync(exampleModelsDir)
  .filter(f => f.endsWith('.bngl'))
  .sort();

console.log(`Found ${modelFiles.length} models in example-models/`);
console.log('');

const results = {
  passed: [] as string[],
  failed: [] as { model: string; error: string }[]
};

for (const modelFile of modelFiles) {
  const modelPath = join(exampleModelsDir, modelFile);
  const modelName = modelFile.replace('.bngl', '');
  
  try {
    // Create temp directory for this run
    const tempDir = mkdtempSync(join(process.cwd(), 'temp_verify_'));
    const tempModelPath = join(tempDir, modelFile);
    copyFileSync(modelPath, tempModelPath);
    
    console.log(`Testing ${modelName}...`, { flush: true });
    
    // Run BNG2.pl
    const cmd = `cd "${tempDir}" && perl "${bng2Script}" "${tempModelPath}" 2>&1`;
    execSync(cmd, { 
      stdio: 'pipe',
      timeout: 30000 
    });
    
    results.passed.push(modelName);
    console.log(`  ✓ PASSED`);
    
    // Clean up temp dir
    rmSync(tempDir, { recursive: true, force: true });
  } catch (error: any) {
    const errorMsg = error.message || String(error);
    results.failed.push({
      model: modelName,
      error: errorMsg.split('\n')[0].substring(0, 150)
    });
    console.log(`  ✗ FAILED: ${errorMsg.split('\n')[0].substring(0, 100)}`);
  }
}

console.log('\n========== SUMMARY ==========');
console.log(`PASSED: ${results.passed.length}`);
results.passed.forEach(m => console.log(`  ✓ ${m}`));

console.log(`\nFAILED: ${results.failed.length}`);
results.failed.forEach(f => console.log(`  ✗ ${f.model}`));

if (results.failed.length > 0) {
  console.log('\nFailed models details:');
  results.failed.forEach(f => {
    console.log(`\n  ${f.model}:`);
    console.log(`    ${f.error}`);
  });
}

console.log(`\nTotal: ${results.passed.length + results.failed.length}`);
process.exit(results.failed.length > 0 ? 1 : 0);
