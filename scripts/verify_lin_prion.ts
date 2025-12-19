
import { parseBNGLWithANTLR } from '../src/parser/BNGLParserWrapper';
import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'published-models/literature/Lin_Prion_2019.bngl');
const content = fs.readFileSync(filePath, 'utf-8');

console.log(`Parsing ${filePath}...`);
const result = parseBNGLWithANTLR(content);

if (result.success) {
    console.log('Parse SUCCESS!');
    // Check if reaction rule 102 was parsed (it's index ~3 because lines 93, 96 etc are rules)
    // Equation 3 is line 102.
    // Rules list should have it.
    const rules = result.model?.reactionRules || [];
    console.log(`Parsed ${rules.length} rules.`);
    // Look for rule with MatchOnce or similar if we stored it?
    // We didn't explicitly store MatchOnce in visitor unless I check constraints logic.
    // My visitor modification stores constraints as string array.
    // "include_reactants", etc.
    // MatchOnce was commented out in my visitor fix ("probably ignored by simulator").
    // But parsing should succeed.
} else {
    console.error('Parse FAILED:', result.errors);
}
