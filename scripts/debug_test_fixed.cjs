
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BNG2_PATH = String.raw`C:\Users\Achyudhan\anaconda3\envs\Research\Lib\site-packages\bionetgen\bng-win\BNG2.pl`;
const OUTPUT_DIR = 'bng_test_output';
const VALIDATION_MODELS_PATH = 'validation_models.ts';
const MODEL_NAME = 'test_fixed';

// Extract code for test_fixed
const fileContent = fs.readFileSync(VALIDATION_MODELS_PATH, 'utf8');
const namePattern = /name:\s*[`'"]test_fixed[`'"]/;
const match = fileContent.match(namePattern);

if (!match) {
    console.error("Model not found");
    process.exit(1);
}

const startIndex = match.index;
const codeLabelIndex = fileContent.indexOf('code:', startIndex);
const backtickStart = fileContent.indexOf('`', codeLabelIndex);
let backtickEnd = -1;
for (let i = backtickStart + 1; i < fileContent.length; i++) {
    if (fileContent[i] === '`' && fileContent[i-1] !== '\\') {
        backtickEnd = i;
        break;
    }
}
const bnglCode = fileContent.substring(backtickStart + 1, backtickEnd);

fs.writeFileSync(path.join(OUTPUT_DIR, 'test_fixed.bngl'), bnglCode);

console.log(`Running BNG2 for ${MODEL_NAME}...`);
try {
    const cmd = `perl "${BNG2_PATH}" "${MODEL_NAME}.bngl"`;
    // Run and capture output to see error
    const output = execSync(cmd, { cwd: OUTPUT_DIR, encoding: 'utf8' });
    console.log("Success:", output.substring(0, 200));
} catch (e) {
    console.error("Error running BNG2:");
    console.error(e.stdout ? e.stdout.substring(0, 500) : "No stdout");
    console.error(e.stderr ? e.stderr.substring(0, 500) : "No stderr");
    console.error(e.message);
}
