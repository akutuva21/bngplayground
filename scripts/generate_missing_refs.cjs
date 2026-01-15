
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
// Using user-provided Conda path which likely has NFsim/Perl correctly configured
const BNG2_PATH = String.raw`C:\Users\Achyudhan\anaconda3\envs\Research\Lib\site-packages\bionetgen\bng-win\BNG2.pl`;
const OUTPUT_DIR = 'bng_test_output';
const VALIDATION_MODELS_PATH = 'validation_models.ts';

// Models to generate (from analysis)
// Updated list from previous step 4784
const MISSING_MODELS = [
  'simple_sbml_import',
  'test_fixed'
];

// Mapping for names that differ in code vs ID
const NAME_ALIASES = {
  'toy_jim': 'toy-jim'
};

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 1. Read validation_models.ts content
const fileContent = fs.readFileSync(VALIDATION_MODELS_PATH, 'utf8');

// 2. Extract models using Regex (simpler than Compiling TS)
function extractModelCode(content, modelName) {
  // Regex to find the object block for the model
  const lookupName = NAME_ALIASES[modelName] || modelName;
  
  // Normalized lookup to handle quotes/ticks
  const namePattern = new RegExp(`name:\\s*['"\`]?${lookupName}['"\`]?`, 'i');
  const match = content.match(namePattern);
  
  if (!match) {
    console.error(`❌ Model ${lookupName} (ID: ${modelName}) not found in file.`);
    return null;
  }
  
  const startIndex = match.index;
  const codeLabelIndex = content.indexOf('code:', startIndex);
  if (codeLabelIndex === -1) return null;
  
  const backtickStart = content.indexOf('`', codeLabelIndex);
  if (backtickStart === -1) return null;
  
  let backtickEnd = -1;
  for (let i = backtickStart + 1; i < content.length; i++) {
    if (content[i] === '`' && content[i-1] !== '\\') { 
      backtickEnd = i;
      break;
    }
  }
  
  if (backtickEnd === -1) return null;
  
  return content.substring(backtickStart + 1, backtickEnd);
}

// 3. Execution Loop
console.log(`Starting Reference Generation for ${MISSING_MODELS.length} models...`);

MISSING_MODELS.forEach(modelName => {
  console.log(`Processing ${modelName}...`);
  
  const bnglCode = extractModelCode(fileContent, modelName);
  
  if (!bnglCode) {
    console.error(`  Could not extract code for ${modelName}`);
    return;
  }
  
  // Use ID for filename so comparison script finds it
  const tempBnglPath = path.join(OUTPUT_DIR, `${modelName}.bngl`);
  fs.writeFileSync(tempBnglPath, bnglCode);
  
  try {
    const cmd = `perl "${BNG2_PATH}" "${modelName}.bngl"`;
    console.log(`  Target: ${cmd}`);
    
    execSync(cmd, { cwd: OUTPUT_DIR, stdio: 'pipe' }); 
    
    const gdatPath = path.join(OUTPUT_DIR, `${modelName}.gdat`);

    // Check for .cdat (some models like test_fixed output this instead of .gdat)
    if (!fs.existsSync(gdatPath)) {
      const cdatPath = path.join(OUTPUT_DIR, `${modelName}.cdat`);
      if (fs.existsSync(cdatPath)) {
        console.log(`  ✅ Generated ${modelName}.cdat (Species data)`);
      }
    }

    if (fs.existsSync(gdatPath)) {
      console.log(`  ✅ Generated ${modelName}.gdat`);
    } else {
      console.error(`  ❌ Failed to generate .gdat for ${modelName}`);
      // Check for .scan output or other variants? 
      // NFsim might output .gdat differently?
    }
    
  } catch (error) {
    console.error(`  ❌ Error running BNG2.pl: ${error.message}`);
    // Print first 200 chars of stdout if available in error
    if (error.stdout) console.log('  Output:', error.stdout.toString().substring(0, 200));
    if (error.stderr) console.log('  Error Output:', error.stderr.toString().substring(0, 200));
  } finally {
     if (fs.existsSync(tempBnglPath)) fs.unlinkSync(tempBnglPath);
    const netPath = path.join(OUTPUT_DIR, `${modelName}.net`);
    if (fs.existsSync(netPath)) fs.unlinkSync(netPath);
  }
});

console.log('Reference Generation Complete.');
