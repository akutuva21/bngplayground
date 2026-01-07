/**
 * Debug script: Investigate cBNGL_simple observable discrepancy
 * Simplified version without complex imports
 * 
 * Run: node debug_cbngl_observable_simple.js
 */
const fs = require('fs');
const path = require('path');

// Read BNG2 .net file to get species and observable groups
function parseBNG2Net(netPath) {
  const content = fs.readFileSync(netPath, 'utf-8');
  const lines = content.split('\n');
  
  const species = [];
  const groups = [];
  
  let section = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('begin species')) {
      section = 'species';
      continue;
    }
    if (trimmed.startsWith('end species')) {
      section = '';
      continue;
    }
    if (trimmed.startsWith('begin groups')) {
      section = 'groups';
      continue;
    }
    if (trimmed.startsWith('end groups')) {
      section = '';
      continue;
    }
    
    if (section === 'species' && trimmed) {
      const match = trimmed.match(/^\s*(\d+)\s+(\S+)\s+(\S+)/);
      if (match) {
        species.push({
          index: parseInt(match[1]),
          name: match[2],
          initialConc: match[3]
        });
      }
    }
    
    if (section === 'groups' && trimmed) {
      const match = trimmed.match(/^\s*\d+\s+(\S+)\s+([\d,]+)/);
      if (match) {
        groups.push({
          name: match[1],
          indices: match[2].split(',').map(n => parseInt(n.trim()))
        });
      }
    }
  }
  
  return { species, groups };
}

// Helper functions from bnglWorker.ts
const getCompartment = (s) => {
  const prefix = s.match(/^@([A-Za-z0-9_]+):/);
  if (prefix) return prefix[1];
  const suffix = s.match(/@([A-Za-z0-9_]+)$/);
  if (suffix) return suffix[1];
  return null;
};

const removeCompartment = (s) => {
  return s.replace(/^@[A-Za-z0-9_]+::?/, '').replace(/@[A-Za-z0-9_]+$/, '');
};

function getMoleculeCompartment(mol) {
  const prefixMatch = mol.match(/^@([A-Za-z0-9_]+)::?(.+)$/);
  if (prefixMatch) {
    let cleanMol = prefixMatch[2];
    const suffixMatch = cleanMol.match(/^(.+)@([A-Za-z0-9_]+)$/);
    if (suffixMatch) {
      cleanMol = suffixMatch[1];
    }
    return { compartment: prefixMatch[1], cleanMol };
  }
  const match = mol.match(/^(.+)@([A-Za-z0-9_]+)$/);
  if (match) {
    return { compartment: match[2], cleanMol: match[1] };
  }
  return { compartment: null, cleanMol: mol };
}

function countPatternMatches(speciesStr, patternStr) {
  const patComp = getCompartment(patternStr);
  const cleanPat = removeCompartment(patternStr);
  const specLevelComp = getCompartment(speciesStr);
  
  const specMols = speciesStr.split('.');
  let count = 0;
  
  for (const sMol of specMols) {
    const { compartment: rawMolComp, cleanMol } = getMoleculeCompartment(sMol);
    const molComp = specLevelComp ?? rawMolComp;
    
    if (patComp && molComp !== patComp) continue;
    
    const cleanPatName = cleanPat.match(/^([A-Za-z0-9_]+)/)?.[1];
    const cleanMolName = cleanMol.match(/^([A-Za-z0-9_]+)/)?.[1];
    
    if (cleanPatName === cleanMolName) {
      count += 1;
    }
  }
  
  return count;
}

function main() {
  const netPath = path.join(__dirname, 'bng_test_output/cBNGL_simple.net');
  
  console.log('=== Parsing BNG2 .net file ===');
  const bng2Data = parseBNG2Net(netPath);
  
  console.log('\nBNG2 Species (25 total):');
  for (const sp of bng2Data.species) {
    console.log(`  ${sp.index}: ${sp.name}`);
  }
  
  console.log('\nBNG2 Observable Groups:');
  for (const grp of bng2Data.groups) {
    console.log(`  ${grp.name}: species ${grp.indices.join(', ')}`);
  }
  
  const lBoundPM = bng2Data.groups.find(g => g.name === 'L_Bound_PM');
  const lBoundEM = bng2Data.groups.find(g => g.name === 'L_Bound_EM');
  
  // Test web simulator's matching logic against BNG2 species
  console.log('\n\n=== Testing Web Simulator Observable Matching Logic ===');
  
  console.log('\nPattern @PM:L - expected to match L_Bound_PM species:');
  let webMatches_PM = [];
  for (const sp of bng2Data.species) {
    const count = countPatternMatches(sp.name, '@PM:L');
    const inBNG2_PM = lBoundPM?.indices.includes(sp.index) ? '✓' : ' ';
    const inBNG2_EM = lBoundEM?.indices.includes(sp.index) ? '✓' : ' ';
    if (count > 0 || lBoundPM?.indices.includes(sp.index) || lBoundEM?.indices.includes(sp.index)) {
      webMatches_PM.push({ index: sp.index, count, name: sp.name });
      console.log(`  ${sp.index}: web_count=${count} BNG2_PM[${inBNG2_PM}] BNG2_EM[${inBNG2_EM}] ${sp.name}`);
    }
  }

  console.log('\nPattern @EM:L - expected to match L_Bound_EM species:');
  let webMatches_EM = [];
  for (const sp of bng2Data.species) {
    const count = countPatternMatches(sp.name, '@EM:L');
    const inBNG2_PM = lBoundPM?.indices.includes(sp.index) ? '✓' : ' ';
    const inBNG2_EM = lBoundEM?.indices.includes(sp.index) ? '✓' : ' ';
    if (count > 0 || lBoundPM?.indices.includes(sp.index) || lBoundEM?.indices.includes(sp.index)) {
      webMatches_EM.push({ index: sp.index, count, name: sp.name });
      console.log(`  ${sp.index}: web_count=${count} BNG2_PM[${inBNG2_PM}] BNG2_EM[${inBNG2_EM}] ${sp.name}`);
    }
  }

  console.log('\n\n=== DIAGNOSIS ===');
  
  // Check which species the web logic would assign to PM vs EM
  const webPM_indices = bng2Data.species.filter(sp => countPatternMatches(sp.name, '@PM:L') > 0).map(sp => sp.index);
  const webEM_indices = bng2Data.species.filter(sp => countPatternMatches(sp.name, '@EM:L') > 0).map(sp => sp.index);
  
  console.log(`\nBNG2 L_Bound_PM: ${lBoundPM?.indices.join(', ')}`);
  console.log(`Web  L_Bound_PM: ${webPM_indices.join(', ')}`);
  console.log(`Match: ${JSON.stringify(webPM_indices.sort()) === JSON.stringify(lBoundPM?.indices.sort())}`);
  
  console.log(`\nBNG2 L_Bound_EM: ${lBoundEM?.indices.join(', ')}`);
  console.log(`Web  L_Bound_EM: ${webEM_indices.join(', ')}`);
  console.log(`Match: ${JSON.stringify(webEM_indices.sort()) === JSON.stringify(lBoundEM?.indices.sort())}`);
  
  // Detailed analysis of mismatches
  console.log('\n=== MISMATCH ANALYSIS ===');
  
  const bng2PM = new Set(lBoundPM?.indices || []);
  const bng2EM = new Set(lBoundEM?.indices || []);
  const webPM = new Set(webPM_indices);
  const webEM = new Set(webEM_indices);
  
  // Species in BNG2 PM but not in web PM
  const missingFromWebPM = [...bng2PM].filter(i => !webPM.has(i));
  if (missingFromWebPM.length > 0) {
    console.log('\nIn BNG2 PM but NOT in web PM:');
    for (const idx of missingFromWebPM) {
      const sp = bng2Data.species.find(s => s.index === idx);
      console.log(`  ${idx}: ${sp?.name}`);
      // Debug why it doesn't match
      console.log(`    specLevelComp = ${getCompartment(sp?.name)}`);
    }
  }
  
  // Species in web PM but not in BNG2 PM
  const extraInWebPM = [...webPM].filter(i => !bng2PM.has(i));
  if (extraInWebPM.length > 0) {
    console.log('\nIn web PM but NOT in BNG2 PM:');
    for (const idx of extraInWebPM) {
      const sp = bng2Data.species.find(s => s.index === idx);
      console.log(`  ${idx}: ${sp?.name}`);
    }
  }
  
  // Species in BNG2 EM but not in web EM
  const missingFromWebEM = [...bng2EM].filter(i => !webEM.has(i));
  if (missingFromWebEM.length > 0) {
    console.log('\nIn BNG2 EM but NOT in web EM:');
    for (const idx of missingFromWebEM) {
      const sp = bng2Data.species.find(s => s.index === idx);
      console.log(`  ${idx}: ${sp?.name}`);
    }
  }
  
  // Species in web EM but not in BNG2 EM
  const extraInWebEM = [...webEM].filter(i => !bng2EM.has(i));
  if (extraInWebEM.length > 0) {
    console.log('\nIn web EM but NOT in BNG2 EM:');
    for (const idx of extraInWebEM) {
      const sp = bng2Data.species.find(s => s.index === idx);
      console.log(`  ${idx}: ${sp?.name}`);
    }
  }
  
  if (missingFromWebPM.length === 0 && extraInWebPM.length === 0 &&
      missingFromWebEM.length === 0 && extraInWebEM.length === 0) {
    console.log('\nObservable matching is CORRECT! The discrepancy must be elsewhere.');
    console.log('Possible causes:');
    console.log('  1. Species ORDER differs between web and BNG2 (different indices)');
    console.log('  2. Reaction rates differ');
    console.log('  3. ODE solver differences');
  }
}

main();
