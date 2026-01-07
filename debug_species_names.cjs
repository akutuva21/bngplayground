/**
 * Debug: Compare web simulator species names vs BNG2 species names
 * to check if species order or canonical names differ
 */
const fs = require('fs');
const path = require('path');

function parseBNG2Net(netPath) {
  const content = fs.readFileSync(netPath, 'utf-8');
  const lines = content.split('\n');
  const species = [];
  let section = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('begin species')) { section = 'species'; continue; }
    if (trimmed.startsWith('end species')) { section = ''; continue; }
    if (section === 'species' && trimmed) {
      const match = trimmed.match(/^\s*(\d+)\s+(\S+)\s+(\S+)/);
      if (match) {
        species.push({ index: parseInt(match[1]), name: match[2] });
      }
    }
  }
  return species;
}

function parseWebCSV(csvPath) {
  // Web CSV first line is headers
  // We need the species output file, not observable output
  // Let's try to read the comparison log instead
  return null;
}

const netPath = path.join(__dirname, 'bng_test_output/cBNGL_simple.net');
const bng2Species = parseBNG2Net(netPath);

console.log('=== BNG2 Species Names ===');
for (const sp of bng2Species) {
  console.log(`${sp.index}: ${sp.name}`);
}

// The key question: are the web simulator species names matching BNG2?
// Let's analyze the BNG2 names more carefully

console.log('\n\n=== Analysis of L-containing species ===');
const lSpecies = bng2Species.filter(sp => sp.name.includes('::L(') || sp.name.includes('.L('));

console.log('\nSpecies containing L molecule:');
for (const sp of lSpecies) {
  // Extract complex compartment (prefix)
  const compMatch = sp.name.match(/^@([A-Za-z0-9_]+)::/);
  const complexComp = compMatch ? compMatch[1] : 'none';
  
  // Check if L has molecule-level compartment suffix
  const lMatch = sp.name.match(/L\([^)]*\)@([A-Za-z0-9_]+)/);
  const lMolComp = lMatch ? lMatch[1] : 'none';
  
  console.log(`${sp.index}: complexComp=${complexComp} L_mol_comp=${lMolComp}`);
  console.log(`   ${sp.name}`);
}

console.log('\n\n=== The key insight ===');
console.log('In BNG2 cBNGL species naming:');
console.log('  @PM::L(r!1)@EC.R(l!1,tf~Y)');
console.log('  ^-- complex compartment (PM)');
console.log('           ^-- L came from EC originally (molecule origin)');
console.log('');
console.log('For observable @PM:L (L_Bound_PM), BNG2 matches based on');
console.log('the COMPLEX compartment (@PM::), not the molecule origin (@EC).');

console.log('\n\n=== Checking observable pattern parsing ===');

// Test the web simulator's pattern parsing
const getCompartment = (s) => {
  const prefix = s.match(/^@([A-Za-z0-9_]+):/);
  if (prefix) return prefix[1];
  const suffix = s.match(/@([A-Za-z0-9_]+)$/);
  if (suffix) return suffix[1];
  return null;
};

console.log('Pattern "@PM:L" -> compartment:', getCompartment('@PM:L'));
console.log('Pattern "@EM:L" -> compartment:', getCompartment('@EM:L'));

// Test species-level compartment extraction
for (const sp of lSpecies) {
  console.log(`Species "${sp.name.substring(0, 40)}..." -> compartment:`, getCompartment(sp.name));
}

console.log('\n\n=== CRITICAL: Check if Web generates same species names ===');
console.log('The next step is to verify what species names the web simulator');
console.log('actually generates during network generation.');
console.log('');
console.log('If the names differ (e.g., different bond numbering, different');
console.log('molecule ordering), then the observable matching would be correct');
console.log('per the web names, but the dynamics would be wrong if the species');
console.log('indices in reactions are wrong.');
