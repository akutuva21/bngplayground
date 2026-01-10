
/**
 * Rate Constant Comparison Tool for BNG2 Parity Debugging
 * 
 * This script compares the rate constants computed by the web simulator
 * against BNG2's .net file output to identify discrepancies that could
 * cause simulation divergence.
 * 
 * Usage:
 *   npx ts-node scripts/compare_rate_constants.ts <model_name>
 * 
 * Example:
 *   npx ts-node scripts/compare_rate_constants.ts cBNGL_simple
 * 
 * Prerequisites:
 *   - BNG2 .net file must exist in bng_test_output/<model_name>.net
 *   - Model BNGL file must exist in public/models/<model_name>.bngl
 */

import * as fs from 'fs';
import * as path from 'path';

// Type definitions
interface ParsedReaction {
  index: number;
  reactants: string[];
  products: string[];
  rateConstant: number;
  rateExpression?: string;
}

interface ComparisonResult {
  reactionIndex: number;
  webRate: number;
  bng2Rate: number;
  absoluteError: number;
  relativeError: number;
  reactantsMatch: boolean;
  productsMatch: boolean;
}

/**
 * Parse a BNG2 .net file to extract reaction rate constants.
 * 
 * .net file format (reactions section):
 * begin reactions
 *   1 1,2 3 kp_LR #_R1
 *   2 3 1,2 km_LR #_reverse_R1
 *   ...
 * end reactions
 * 
 * Format: index reactant_indices product_indices rate_expression #comment
 */
function parseBNG2NetFile(netFilePath: string): { 
  reactions: ParsedReaction[];
  parameters: Map<string, number>;
  species: string[];
} {
  const content = fs.readFileSync(netFilePath, 'utf-8');
  const lines = content.split('\n');
  
  const reactions: ParsedReaction[] = [];
  const parameters = new Map<string, number>();
  const species: string[] = [];
  
  let section = '';
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Section markers
    if (trimmed.startsWith('begin ')) {
      section = trimmed.replace('begin ', '').toLowerCase();
      continue;
    }
    if (trimmed.startsWith('end ')) {
      section = '';
      continue;
    }
    
    // Skip empty lines and comments outside sections
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    // Parse parameters section
    if (section === 'parameters') {
      // Format: index name value
      const match = trimmed.match(/^\s*(\d+)\s+(\S+)\s+(\S+)/);
      if (match) {
        const name = match[2];
        const value = parseFloat(match[3]);
        parameters.set(name, value);
      }
      continue;
    }
    
    // Parse species section
    if (section === 'species') {
      // Format: index species_string concentration
      const match = trimmed.match(/^\s*(\d+)\s+(\S+)\s+(\S+)/);
      if (match) {
        species[parseInt(match[1])] = match[2];
      }
      continue;
    }
    
    // Parse reactions section
    if (section === 'reactions') {
      // Format: index reactant_indices product_indices rate #comment
      // Indices are comma-separated, 0 means no reactants/products
      const parts = trimmed.split(/\s+/);
      if (parts.length < 4) continue;
      
      const index = parseInt(parts[0]);
      const reactantIndices = parts[1] === '0' ? [] : parts[1].split(',').map(Number);
      const productIndices = parts[2] === '0' ? [] : parts[2].split(',').map(Number);
      const rateExpr = parts[3];
      
      // Evaluate rate expression
      let rateConstant: number;
      if (/^[0-9.e+-]+$/i.test(rateExpr)) {
        rateConstant = parseFloat(rateExpr);
      } else {
        // Try to resolve parameter reference
        rateConstant = parameters.get(rateExpr) ?? NaN;
        if (isNaN(rateConstant)) {
          // Try evaluating as expression
          rateConstant = evaluateSimpleExpression(rateExpr, parameters);
        }
      }
      
      reactions.push({
        index,
        reactants: reactantIndices.map(i => species[i] || `species_${i}`),
        products: productIndices.map(i => species[i] || `species_${i}`),
        rateConstant,
        rateExpression: rateExpr
      });
    }
  }
  
  return { reactions, parameters, species };
}

/**
 * Simple expression evaluator for .net file rate expressions
 */
function evaluateSimpleExpression(expr: string, params: Map<string, number>): number {
  let evaluable = expr;
  
  // Replace parameter names with values (longest first to avoid partial matches)
  const sortedParams = Array.from(params.entries()).sort((a, b) => b[0].length - a[0].length);
  for (const [name, value] of sortedParams) {
    const regex = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    evaluable = evaluable.replace(regex, value.toString());
  }
  
  // Convert BNGL operators
  evaluable = evaluable.replace(/\^/g, '**');
  evaluable = evaluable.replace(/\bln\(/g, 'Math.log(');
  evaluable = evaluable.replace(/\bexp\(/g, 'Math.exp(');
  
  try {
    return new Function(`return ${evaluable}`)();
  } catch {
    return NaN;
  }
}

/**
 * Run the web simulator and extract computed rate constants.
 * This imports the simulation logic and runs network generation.
 */
async function getWebSimulatorRates(modelPath: string): Promise<{
  reactions: ParsedReaction[];
  parameters: Map<string, number>;
  species: string[];
}> {
  // Dynamic imports for the web simulator components
  const { parseBNGLStrict } = await import('../src/parser/BNGLParserWrapper');
  const { NetworkGenerator } = await import('../src/services/graph/NetworkGenerator');
  const { BNGLParser } = await import('../src/services/graph/core/BNGLParser');
  
  const bnglCode = fs.readFileSync(modelPath, 'utf-8');
  const model = parseBNGLStrict(bnglCode);
  
  if (!model) {
    throw new Error(`Failed to parse model: ${modelPath}`);
  }
  
  // Build parameter map
  const parametersMap = new Map<string, number>();
  for (const [key, value] of Object.entries(model.parameters)) {
    parametersMap.set(key, Number(value));
  }
  
  // Parse seed species
  const seedSpecies = model.species.map(s => BNGLParser.parseSpeciesGraph(s.name));
  
  // Build rules
  const rules = model.reactionRules.flatMap((r, idx) => {
    const rate = BNGLParser.evaluateExpression(r.rate, parametersMap);
    const ruleStr = `${r.reactants.join(' + ') || '0'} -> ${r.products.join(' + ') || '0'}`;
    
    try {
      const forwardRule = BNGLParser.parseRxnRule(ruleStr, rate);
      forwardRule.name = r.name || `_R${idx + 1}`;
      
      if (r.isBidirectional && r.reverseRate) {
        const revRate = BNGLParser.evaluateExpression(r.reverseRate, parametersMap);
        const revRuleStr = `${r.products.join(' + ') || '0'} -> ${r.reactants.join(' + ') || '0'}`;
        const reverseRule = BNGLParser.parseRxnRule(revRuleStr, revRate);
        return [forwardRule, reverseRule];
      }
      
      return [forwardRule];
    } catch {
      return [];
    }
  });
  
  // Generate network
  const generator = new NetworkGenerator({
    maxSpecies: 1000,
    maxReactions: 5000,
    maxIterations: model.networkOptions?.maxIter ?? 100,
    compartments: model.compartments?.map(c => ({
      name: c.name,
      dimension: c.dimension,
      size: c.size,
      parent: c.parent
    }))
  });
  
  const network = await generator.generate(seedSpecies, rules, () => {});
  
  // Extract reactions
  const reactions: ParsedReaction[] = network.reactions.map((rxn, idx) => ({
    index: idx + 1,
    reactants: rxn.reactants.map(i => network.species[i]?.canonicalString || `species_${i}`),
    products: rxn.products.map(i => network.species[i]?.canonicalString || `species_${i}`),
    rateConstant: rxn.rate,
    rateExpression: rxn.rateExpression
  }));
  
  const species = network.species.map(s => s.canonicalString);
  
  return { reactions, parameters: parametersMap, species };
}

/**
 * Compare rate constants between web simulator and BNG2
 */
function compareRateConstants(
  webReactions: ParsedReaction[],
  bng2Reactions: ParsedReaction[],
  tolerance: { absolute: number; relative: number } = { absolute: 1e-10, relative: 1e-6 }
): ComparisonResult[] {
  const results: ComparisonResult[] = [];
  
  // Match reactions by index (assumes same ordering)
  const maxLen = Math.max(webReactions.length, bng2Reactions.length);
  
  for (let i = 0; i < maxLen; i++) {
    const webRxn = webReactions[i];
    const bng2Rxn = bng2Reactions[i];
    
    if (!webRxn || !bng2Rxn) {
      console.warn(`Reaction count mismatch at index ${i + 1}`);
      continue;
    }
    
    const webRate = webRxn.rateConstant;
    const bng2Rate = bng2Rxn.rateConstant;
    
    const absoluteError = Math.abs(webRate - bng2Rate);
    const denom = Math.max(Math.abs(webRate), Math.abs(bng2Rate), 1e-300);
    const relativeError = absoluteError / denom;
    
    // Simple reactant/product matching (ignoring order)
    const reactantsMatch = arraysEqualIgnoreOrder(webRxn.reactants, bng2Rxn.reactants);
    const productsMatch = arraysEqualIgnoreOrder(webRxn.products, bng2Rxn.products);
    
    results.push({
      reactionIndex: i + 1,
      webRate,
      bng2Rate,
      absoluteError,
      relativeError,
      reactantsMatch,
      productsMatch
    });
  }
  
  return results;
}

function arraysEqualIgnoreOrder(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((v, i) => v === sortedB[i]);
}

/**
 * Format and print comparison results
 */
function printResults(
  results: ComparisonResult[],
  tolerance: { absolute: number; relative: number }
): void {
  console.log('\n' + '='.repeat(80));
  console.log('RATE CONSTANT COMPARISON RESULTS');
  console.log('='.repeat(80));
  
  let matchCount = 0;
  let mismatchCount = 0;
  const mismatches: ComparisonResult[] = [];
  
  for (const r of results) {
    const isMatch = r.absoluteError <= tolerance.absolute || r.relativeError <= tolerance.relative;
    
    if (isMatch) {
      matchCount++;
    } else {
      mismatchCount++;
      mismatches.push(r);
    }
  }
  
  console.log(`\nSummary: ${matchCount} matches, ${mismatchCount} mismatches out of ${results.length} reactions`);
  console.log(`Tolerance: absolute=${tolerance.absolute}, relative=${tolerance.relative}`);
  
  if (mismatches.length > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log('MISMATCHES:');
    console.log('-'.repeat(80));
    
    for (const m of mismatches) {
      console.log(`\nReaction ${m.reactionIndex}:`);
      console.log(`  Web rate:      ${m.webRate.toExponential(10)}`);
      console.log(`  BNG2 rate:     ${m.bng2Rate.toExponential(10)}`);
      console.log(`  Absolute err:  ${m.absoluteError.toExponential(4)}`);
      console.log(`  Relative err:  ${(m.relativeError * 100).toFixed(6)}%`);
      if (!m.reactantsMatch) console.log(`  WARNING: Reactants do not match!`);
      if (!m.productsMatch) console.log(`  WARNING: Products do not match!`);
    }
  }
  
  // Statistical summary
  if (results.length > 0) {
    const relErrors = results.map(r => r.relativeError);
    const maxRelError = Math.max(...relErrors);
    const avgRelError = relErrors.reduce((a, b) => a + b, 0) / relErrors.length;
    
    console.log('\n' + '-'.repeat(80));
    console.log('STATISTICS:');
    console.log('-'.repeat(80));
    console.log(`  Max relative error:     ${(maxRelError * 100).toFixed(6)}%`);
    console.log(`  Average relative error: ${(avgRelError * 100).toFixed(6)}%`);
    
    // Find the reaction with maximum error
    const maxErrorRxn = results.find(r => r.relativeError === maxRelError);
    if (maxErrorRxn) {
      console.log(`  Worst reaction:         #${maxErrorRxn.reactionIndex}`);
    }
  }
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: npx ts-node scripts/compare_rate_constants.ts <model_name>');
    console.log('Example: npx ts-node scripts/compare_rate_constants.ts cBNGL_simple');
    process.exit(1);
  }
  
  const modelName = args[0];
  const projectRoot = path.resolve(__dirname, '..');
  
  // Find model files
  const bnglPath = path.join(projectRoot, 'public', 'models', `${modelName}.bngl`);
  const netPath = path.join(projectRoot, 'bng_test_output', `${modelName}.net`);
  
  if (!fs.existsSync(bnglPath)) {
    console.error(`Model file not found: ${bnglPath}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(netPath)) {
    console.error(`BNG2 .net file not found: ${netPath}`);
    console.error('Please run BNG2 first to generate the .net file.');
    process.exit(1);
  }
  
  console.log(`Comparing rate constants for: ${modelName}`);
  console.log(`BNGL file: ${bnglPath}`);
  console.log(`.net file: ${netPath}`);
  
  try {
    // Parse BNG2 .net file
    console.log('\nParsing BNG2 .net file...');
    const bng2Data = parseBNG2NetFile(netPath);
    console.log(`  Found ${bng2Data.reactions.length} reactions`);
    console.log(`  Found ${bng2Data.parameters.size} parameters`);
    
    // Run web simulator
    console.log('\nRunning web simulator network generation...');
    const webData = await getWebSimulatorRates(bnglPath);
    console.log(`  Generated ${webData.reactions.length} reactions`);
    
    // Compare
    console.log('\nComparing rate constants...');
    const results = compareRateConstants(webData.reactions, bng2Data.reactions);
    
    // Print results
    printResults(results, { absolute: 1e-10, relative: 1e-6 });
    
    // Write detailed JSON output
    const outputPath = path.join(projectRoot, 'artifacts', `rate_comparison_${modelName}.json`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify({
      model: modelName,
      timestamp: new Date().toISOString(),
      webReactionCount: webData.reactions.length,
      bng2ReactionCount: bng2Data.reactions.length,
      results,
      webParameters: Object.fromEntries(webData.parameters),
      bng2Parameters: Object.fromEntries(bng2Data.parameters)
    }, null, 2));
    console.log(`\nDetailed results written to: ${outputPath}`);
    
  } catch (error) {
    console.error('Error during comparison:', error);
    process.exit(1);
  }
}

// Run if executed directly
main().catch(console.error);
