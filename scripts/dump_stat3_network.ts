import fs from 'fs/promises';
import path from 'path';
import { parseBNGL } from '../services/parseBNGL.ts';
import { BNGLParser } from '../src/services/graph/core/BNGLParser.ts';
import { NetworkGenerator } from '../src/services/graph/NetworkGenerator.ts';

async function main() {
  const filePath = path.resolve(__dirname, '../example-models/stat3-mediated-transcription.bngl');
  const code = await fs.readFile(filePath, 'utf8');
  console.log('Parsing BNGL...');
  const model = parseBNGL(code);
  console.log('Model reactionRules count:', model.reactionRules.length);
  for (const [i, r] of model.reactionRules.entries()) {
    console.log(i, r.reactants.join(' + '), r.isBidirectional ? '<->' : '->', r.products.join(' + '), 'rate=', r.rate);
  }

  // Build seed species and rules for NetworkGenerator
  const seedSpecies = model.species.map((s: any) => BNGLParser.parseSpeciesGraph(s.name));
  const rules: any[] = [];
  for (const [i, r] of model.reactionRules.entries()) {
    if (r.isBidirectional && r.rate && r.rate.includes(',')) {
      const parts = r.rate.split(',').map((p: string) => p.trim());
      // forward
      rules.push(BNGLParser.parseRxnRule(`${r.reactants.join(' + ')} -> ${r.products.join(' + ')}`, parts[0] || 0, r.name || `rule_${i}_f`));
      // reverse
      rules.push(BNGLParser.parseRxnRule(`${r.products.join(' + ')} -> ${r.reactants.join(' + ')}`, parts[1] || 0, r.name || `rule_${i}_r`));
    } else {
      rules.push(BNGLParser.parseRxnRule(`${r.reactants.join(' + ')} -> ${r.products.join(' + ')}`, r.rate || r.rateExpression || 0, r.name || `rule_${i}`));
    }
  }

  console.log('Seed species count:', seedSpecies.length, 'Rules count:', rules.length);
  const gen = new NetworkGenerator({ maxSpecies: 5000, maxIterations: 200 });
  const result = await gen.generate(seedSpecies, rules);
  console.log('Generated species:', result.species.length);
  console.log('Generated reactions:', result.reactions.length);

  // Print first 30 species canonical names
  const canonical = result.species.map(s => BNGLParser.speciesGraphToString(s.graph));
  console.log('Species (first 30):');
  canonical.slice(0, 30).forEach((c, idx) => console.log(idx, c));

  // Find any species matching STAT3(s~P)
  const pstat3 = canonical.filter(c => c.includes('STAT3(s~P') || c.includes('STAT3(s~P)'));
  console.log('Species containing STAT3(s~P):', pstat3.length);

  // Find reactions where reactants include STAT3(s~U,loc~cyt)
  const reactionsStr = result.reactions.map((r, idx) => {
    const reac = r.reactants.map((i: number) => canonical[i]).join(' + ');
    const prod = r.products.map((i: number) => canonical[i]).join(' + ');
    return `${idx}: ${reac} -> ${prod} [rate=${r.rate}]`;
  });

  const phosReactions = reactionsStr.filter(s => s.includes('STAT3(s~U,loc~cyt)'));
  console.log('Reactions containing STAT3(s~U,loc~cyt):', phosReactions.length);
  phosReactions.slice(0, 20).forEach(r => console.log(r));

}

main().catch(e => { console.error(e); process.exit(1); });
