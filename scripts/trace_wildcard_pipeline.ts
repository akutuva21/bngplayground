/**
 * Full pipeline trace for wildcard pattern handling in repressilator.
 * This tests if the reverse pattern construction preserves the !+ wildcard.
 * 
 * Run: npx ts-node scripts/trace_wildcard_pipeline.ts
 */

import { BNGLParser } from '../src/services/graph/core/BNGLParser.ts';
import { RxnRule } from '../src/services/graph/core/RxnRule.ts';
import { GraphMatcher, clearMatchCache } from '../src/services/graph/core/Matcher.ts';

console.log('=== Full Pipeline Trace: Wildcard in Reverse Rule ===\n');

// Step 1: Parse forward rule using BNGLParser
console.log('Step 1: Parse forward rule with BNGLParser');
console.log('=' .repeat(50));

const forwardRuleStr = 'gTetR(lac!+,lac) + pLacI(tet) -> gTetR(lac!+,lac!1).pLacI(tet!1)';
console.log('Forward rule:', forwardRuleStr);

const forwardRule = BNGLParser.parseRxnRule(forwardRuleStr, 1, 'R2');
console.log('Parsed forward rule:');
console.log('  reactants:', forwardRule.reactants.map(r => r.toString()));
console.log('  products:', forwardRule.products.map(p => p.toString()));

// Check if wildcard is preserved in reactants
const forwardReactant0 = forwardRule.reactants[0];
const forwardComp0 = forwardReactant0.molecules[0].components[0];
console.log('  reactant[0].mol[0].lac[0].wildcard:', forwardComp0.wildcard);

// Check if wildcard is preserved in products
const forwardProduct0 = forwardRule.products[0];
const productComp0 = forwardProduct0.molecules[0].components[0];
console.log('  product[0].mol[0].lac[0].wildcard:', productComp0.wildcard);

console.log('\nStep 2: Create reverse rule manually');
console.log('=' .repeat(50));

// The reverse rule has: reactants = forward.products, products = forward.reactants
// Let's check if RxnRule.createReverse() preserves wildcards
if (typeof forwardRule.createReverse === 'function') {
  const reverseRule = forwardRule.createReverse(0.0009);
  console.log('Reverse rule created via createReverse():');
  console.log('  reactants:', reverseRule.reactants.map(r => r.toString()));
  console.log('  products:', reverseRule.products.map(p => p.toString()));
  
  // Check if wildcard is preserved in reverse reactants (was forward products)
  const reverseReactant0 = reverseRule.reactants[0];
  const reverseComp0 = reverseReactant0.molecules[0].components[0];
  console.log('  reverseReactant[0].mol[0].lac[0].wildcard:', reverseComp0.wildcard);
} else {
  console.log('RxnRule.createReverse() not available');
  console.log('Creating reverse rule manually...');
  
  // Manual construction: reverse reactants = forward products
  const reverseReactants = forwardRule.products;
  const reverseProducts = forwardRule.reactants;
  
  console.log('Reverse reactants (=forward products):', reverseReactants.map(r => r.toString()));
  console.log('Reverse products (=forward reactants):', reverseProducts.map(p => p.toString()));
  
  // The REVERSE pattern for matching should be the FORWARD PRODUCT
  // gTetR(lac!+,lac!1).pLacI(tet!1)
  const reversePattern = reverseReactants[0];
  const reverseWildcard = reversePattern.molecules[0].components[0].wildcard;
  console.log('Reverse pattern lac[0].wildcard:', reverseWildcard);
}

console.log('\nStep 3: Test reverse pattern matching against target');
console.log('=' .repeat(50));

// Parse the reverse direction pattern (= forward product)
const reversePatternStr = 'gTetR(lac!+,lac!1).pLacI(tet!1)';
const reversePattern = BNGLParser.parseSpeciesGraph(reversePatternStr);
console.log('Reverse pattern:', reversePattern.toString());
console.log('  lac[0].wildcard:', reversePattern.molecules[0].components[0].wildcard);

// Parse the target species (doubly-bound gTetR)
const targetStr = 'gTetR(lac!1,lac!2).pLacI(tet!1).pLacI(tet!2)';
const target = BNGLParser.parseSpeciesGraph(targetStr);
console.log('Target species:', target.toString());

// Now test matching
clearMatchCache();
const matches = GraphMatcher.findAllMaps(reversePattern, target);
console.log(`\nmatchCount = ${matches.length}`);

for (let i = 0; i < matches.length; i++) {
  console.log(`Match ${i+1}:`, JSON.stringify([...matches[i].moleculeMap.entries()]));
}

console.log('\n=== CRITICAL FINDING ===');
if (matches.length === 2) {
  console.log('PASS ✓ - End-to-end pipeline preserves wildcard and finds 2 matches');
  console.log('\nThe issue is NOT in BNGLParser or VF2 matching.');
  console.log('The issue must be in how NetworkGenerator:');
  console.log('  1. Constructs rules from BNGLVisitor output');
  console.log('  2. How the ANTLR visitor constructs reactantPatterns/productPatterns strings');
  console.log('  3. Whether the SpeciesGraph is built from raw strings instead of parsed patterns');
} else {
  console.log(`FAIL ✗ - Expected 2 matches, got ${matches.length}`);
}

console.log('\n=== NEXT STEP ===');
console.log('Check how BNGLVisitor constructs ReactionRule and passes to NetworkGenerator.');
console.log('The wildcard might be in the pattern STRING but not in the SpeciesGraph.');
console.log('NetworkGenerator may need to parse the pattern strings to get SpeciesGraph with wildcards.');
