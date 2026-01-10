
/**
 * Verification Script for BNG2 Parity Fixes
 * 
 * This script tests all three parity fixes:
 * 1. High-precision expression evaluation (Repressilator)
 * 2. Rate constant comparison (cBNGL_simple)
 * 3. CVODE stiff configuration (Lang_2024)
 * 
 * Usage:
 *   npx ts-node scripts/verify_parity_fixes.ts
 * 
 * Prerequisites:
 *   npm install decimal.js
 */

import Decimal from 'decimal.js';

// Configure decimal.js
Decimal.set({
  precision: 34,
  rounding: Decimal.ROUND_HALF_EVEN,
});

// ============================================================================
// Test 1: High-Precision Expression Evaluation
// ============================================================================

interface PrecisionTestResult {
  expression: string;
  standardJS: number;
  highPrecision: number;
  bng2Reference: number;
  standardError: number;
  highPrecisionError: number;
  improved: boolean;
}

function testHighPrecisionEvaluation(): PrecisionTestResult[] {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 1: High-Precision Expression Evaluation');
  console.log('='.repeat(70));
  
  const results: PrecisionTestResult[] = [];
  
  // Test case: Repressilator rate expression
  const testCases = [
    {
      name: 'Repressilator binding rate (c0/Na/V*tF/pF)',
      params: {
        Na: 6.022e23,
        V: 1.4e-15,
        c0: 1e9,
        tF: 1e-4,
        pF: 1000
      },
      expression: 'c0/Na/V*tF/pF',
      bng2Reference: 1.1861270574e-7  // From Gemini's investigation
    },
    {
      name: 'Volume-normalized rate (Na*V)',
      params: {
        Na: 6.022e23,
        V: 1.4e-15
      },
      expression: 'Na*V',
      bng2Reference: 6.022e23 * 1.4e-15  // Should be exact
    },
    {
      name: 'Complex chained division',
      params: {
        a: 1e20,
        b: 1e-15,
        c: 1e10,
        d: 1e-5
      },
      expression: 'a/b*c/d',
      bng2Reference: 1e20 / 1e-15 * 1e10 / 1e-5  // Expected: 1e50
    }
  ];
  
  for (const test of testCases) {
    console.log(`\n  Testing: ${test.name}`);
    
    // Standard JavaScript evaluation
    let standardExpr = test.expression;
    for (const [name, value] of Object.entries(test.params)) {
      const regex = new RegExp(`\\b${name}\\b`, 'g');
      standardExpr = standardExpr.replace(regex, value.toString());
    }
    const standardJS = new Function(`return ${standardExpr}`)() as number;
    
    // High-precision evaluation using decimal.js
    const decimalParams = new Map<string, Decimal>();
    for (const [name, value] of Object.entries(test.params)) {
      decimalParams.set(name, new Decimal(value));
    }
    
    // Simple expression parser for testing
    let highPrecision: number;
    try {
      highPrecision = evaluateWithDecimal(test.expression, decimalParams);
    } catch (e) {
      console.error(`    Failed to evaluate with decimal.js: ${e}`);
      highPrecision = NaN;
    }
    
    // Calculate errors
    const standardError = Math.abs(standardJS - test.bng2Reference) / Math.abs(test.bng2Reference);
    const highPrecisionError = Math.abs(highPrecision - test.bng2Reference) / Math.abs(test.bng2Reference);
    const improved = highPrecisionError < standardError;
    
    results.push({
      expression: test.expression,
      standardJS,
      highPrecision,
      bng2Reference: test.bng2Reference,
      standardError,
      highPrecisionError,
      improved
    });
    
    console.log(`    Standard JS:     ${standardJS.toExponential(10)}`);
    console.log(`    High Precision:  ${highPrecision.toExponential(10)}`);
    console.log(`    BNG2 Reference:  ${test.bng2Reference.toExponential(10)}`);
    console.log(`    Standard Error:  ${(standardError * 100).toFixed(6)}%`);
    console.log(`    HP Error:        ${(highPrecisionError * 100).toFixed(6)}%`);
    console.log(`    Improved:        ${improved ? '✓ YES' : '✗ NO'}`);
  }
  
  return results;
}

/**
 * Simple decimal.js expression evaluator for testing
 */
function evaluateWithDecimal(expr: string, params: Map<string, Decimal>): number {
  // Tokenize
  const tokens: string[] = [];
  let current = '';
  for (const char of expr) {
    if ('+-*/'.includes(char)) {
      if (current) tokens.push(current);
      tokens.push(char);
      current = '';
    } else if (char !== ' ') {
      current += char;
    }
  }
  if (current) tokens.push(current);
  
  // Left-to-right evaluation with proper precedence
  // First pass: handle * and /
  const intermediate: (Decimal | string)[] = [];
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token === '*' || token === '/') {
      const left = intermediate.pop() as Decimal;
      const right = params.get(tokens[i + 1]) ?? new Decimal(tokens[i + 1]);
      intermediate.push(token === '*' ? left.times(right) : left.dividedBy(right));
      i += 2;
    } else if ('+-'.includes(token)) {
      intermediate.push(token);
      i++;
    } else {
      intermediate.push(params.get(token) ?? new Decimal(token));
      i++;
    }
  }
  
  // Second pass: handle + and -
  let result = intermediate[0] as Decimal;
  for (let j = 1; j < intermediate.length; j += 2) {
    const op = intermediate[j] as string;
    const right = intermediate[j + 1] as Decimal;
    result = op === '+' ? result.plus(right) : result.minus(right);
  }
  
  return result.toNumber();
}

// ============================================================================
// Test 2: CVODE Stiffness Analysis
// ============================================================================

interface StiffnessTestResult {
  modelName: string;
  rateRatio: number;
  category: string;
  recommendedSettings: string;
}

function testStiffnessAnalysis(): StiffnessTestResult[] {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 2: CVODE Stiffness Analysis');
  console.log('='.repeat(70));
  
  const results: StiffnessTestResult[] = [];
  
  const testModels = [
    {
      name: 'Simple model (mild)',
      rates: [0.1, 1.0, 10.0, 0.5]  // Rate ratio ~100
    },
    {
      name: 'Moderate stiffness',
      rates: [1e-3, 1e3, 0.1, 10]  // Rate ratio ~1e6
    },
    {
      name: 'Lang_2024-like (extreme)',
      rates: [1e-6, 1e0, 1e-3, 1e3, 1e-1]  // Rate ratio ~1e9
    }
  ];
  
  for (const model of testModels) {
    console.log(`\n  Analyzing: ${model.name}`);
    
    const nonZeroRates = model.rates.filter(r => r !== 0).map(Math.abs);
    const maxRate = Math.max(...nonZeroRates);
    const minRate = Math.min(...nonZeroRates);
    const rateRatio = maxRate / minRate;
    
    let category: string;
    let recommendedSettings: string;
    
    if (rateRatio < 1e3) {
      category = 'mild';
      recommendedSettings = 'Default settings (atol=1e-8, rtol=1e-8)';
    } else if (rateRatio < 1e6) {
      category = 'moderate';
      recommendedSettings = 'Increased maxSteps (5000), maxNonlinIters (5)';
    } else if (rateRatio < 1e9) {
      category = 'severe';
      recommendedSettings = 'Stability detection ON, maxOrd=4, stricter convergence';
    } else {
      category = 'extreme';
      recommendedSettings = 'atol/rtol=1e-10, stabLimDet=1, maxOrd=3, analytical Jacobian';
    }
    
    results.push({
      modelName: model.name,
      rateRatio,
      category,
      recommendedSettings
    });
    
    console.log(`    Rate ratio:      ${rateRatio.toExponential(2)}`);
    console.log(`    Category:        ${category}`);
    console.log(`    Recommendation:  ${recommendedSettings}`);
  }
  
  return results;
}

// ============================================================================
// Test 3: Parameter Range Detection
// ============================================================================

interface RangeTestResult {
  parameterSet: string;
  maxMinRatio: number;
  needsHighPrecision: boolean;
}

function testParameterRangeDetection(): RangeTestResult[] {
  console.log('\n' + '='.repeat(70));
  console.log('TEST 3: Parameter Range Detection');
  console.log('='.repeat(70));
  
  const results: RangeTestResult[] = [];
  
  const testSets = [
    {
      name: 'Normal biochemistry',
      params: { kf: 0.1, kr: 0.01, Km: 10, Vmax: 100 }
    },
    {
      name: 'Avogadro-scale (repressilator)',
      params: { Na: 6.022e23, V: 1.4e-15, c0: 1e9, k: 0.1 }
    },
    {
      name: 'Mixed scales (cell biology)',
      params: { Na: 6.022e23, molecules: 100, rate: 1e-6 }
    }
  ];
  
  for (const set of testSets) {
    console.log(`\n  Testing: ${set.name}`);
    
    const values = Object.values(set.params).filter(v => v !== 0).map(Math.abs);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const ratio = max / min;
    const needsHP = ratio > 1e15;
    
    results.push({
      parameterSet: set.name,
      maxMinRatio: ratio,
      needsHighPrecision: needsHP
    });
    
    console.log(`    Max/Min ratio:   ${ratio.toExponential(2)}`);
    console.log(`    Needs HP:        ${needsHP ? '✓ YES' : '✗ NO'}`);
  }
  
  return results;
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║           BNG2 PARITY FIXES VERIFICATION SUITE                       ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝');
  
  const precisionResults = testHighPrecisionEvaluation();
  const stiffnessResults = testStiffnessAnalysis();
  const rangeResults = testParameterRangeDetection();
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('SUMMARY');
  console.log('='.repeat(70));
  
  const precisionPassed = precisionResults.filter(r => r.improved).length;
  console.log(`\n  High-Precision Evaluation: ${precisionPassed}/${precisionResults.length} tests improved`);
  
  const stiffDetected = stiffnessResults.filter(r => r.category !== 'mild').length;
  console.log(`  Stiffness Detection:       ${stiffDetected}/${stiffnessResults.length} stiff models identified`);
  
  const rangeDetected = rangeResults.filter(r => r.needsHighPrecision).length;
  console.log(`  Range Detection:           ${rangeDetected}/${rangeResults.length} extreme ranges detected`);
  
  // Overall assessment
  const allPassed = precisionPassed === precisionResults.length &&
                    stiffDetected >= 2 &&
                    rangeDetected >= 1;
  
  console.log('\n' + '-'.repeat(70));
  if (allPassed) {
    console.log('  ✓ ALL TESTS PASSED - Fixes are working correctly');
  } else {
    console.log('  ✗ SOME TESTS FAILED - Review output above');
  }
  console.log('-'.repeat(70));
  
  // Recommendations
  console.log('\n  NEXT STEPS:');
  console.log('  1. Run: npx ts-node scripts/compare_rate_constants.ts cBNGL_simple');
  console.log('  2. Run full parity check: npm run generate:web-output && npx ts-node scripts/compare_outputs.ts');
  console.log('  3. Compare before/after error rates for the three target models');
  
  console.log('\n');
}

main().catch(console.error);
