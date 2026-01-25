import fs from 'fs';
import path from 'path';
import { parseBNGL } from '../services/parseBNGL.ts';

async function main() {
  const rel = process.argv[2] || 'example-models/egfr-signaling-pathway.bngl';
  const full = path.resolve(rel);
  const code = fs.readFileSync(full, 'utf8');
  console.log('Parsing model:', rel);
  const model = parseBNGL(code);
  console.log('Parsed observables:', model.observables ? model.observables.map((o:any) => ({name: o.name, pattern: o.pattern || o.expression || o.raw})) : []);

  // Dynamically import NetworkExpansion
  const { generateExpandedNetwork } = await import('../services/simulation/NetworkExpansion.ts');
  console.log('Generating expanded network...');
  const expanded = await generateExpandedNetwork(model, () => {}, (p: any) => {});
  console.log('Expanded species:', expanded.species.length);
  console.log('Expanded reactions:', expanded.reactions.length);

  // Find species with EGFR or Dimer in their name
  const egfrSpecies = expanded.species.filter(s => s.name.includes('EGFR') || s.name.includes('egfr') || s.name.includes('Dimers') || s.name.includes('Dimers'));
  console.log('EGFR-related species (count):', egfrSpecies.length);
  egfrSpecies.slice(0, 40).forEach((s, idx) => console.log(idx, s.name, 'init=', s.initialConcentration));

  // Find reactions that mention EGFR in reactants or products
  const rxs = expanded.reactions.filter(r => r.reactants.some(x => x.includes('EGFR') || x.includes('egfr')) || r.products.some(x => x.includes('EGFR') || x.includes('egfr')));
  console.log('Reactions involving EGFR found:', rxs.length);
  rxs.slice(0, 40).forEach((r, idx) => console.log(idx, 'R:', r.reactants.join(' + '), '->', r.products.join(' + '), 'rate=', r.rate, 'k=', r.rateConstant, 'isFunctional=', r.isFunctionalRate));

  // STAT3-specific species checks
  const stat3Nuc = expanded.species.filter(s => /STAT3/.test(s.name) && /loc~nuc/.test(s.name));
  const stat3Phos = expanded.species.filter(s => /STAT3/.test(s.name) && /s~P/.test(s.name));
  console.log('STAT3 nuclear species (count):', stat3Nuc.length);
  stat3Nuc.slice(0,40).forEach((s, idx) => console.log(idx, s.name, 'init=', s.initialConcentration ?? s.init ?? 0));
  console.log('STAT3 phosphorylated species (count):', stat3Phos.length);
  stat3Phos.slice(0,40).forEach((s, idx) => console.log(idx, s.name, 'init=', s.initialConcentration ?? s.init ?? 0));

  // Print first 20 reactions with highest absolute rateConstant
  const sorted = expanded.reactions.slice().sort((a,b) => Math.abs((b.rateConstant||0)) - Math.abs((a.rateConstant||0)));
  console.log('\nTop 20 reactions by |rateConstant|:');
  sorted.slice(0,20).forEach((r, idx) => console.log(idx, r.reactants.join(' + '), '->', r.products.join(' + '), 'rate=', r.rate, 'k=', r.rateConstant));
}

main().catch(e => { console.error(e); process.exit(1); });
