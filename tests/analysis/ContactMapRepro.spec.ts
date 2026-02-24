import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import { parseBNGLWithANTLR } from '../../src/parser/BNGLParserWrapper';
import { buildContactMap } from '../../services/visualization/contactMapBuilder';

// path to the problematic model (adjust as needed)
const MODEL_PATH = 'c:/Users/Achyudhan/OneDrive - University of Pittsburgh/Desktop/Achyudhan/School/PhD/Research/IL6_TGFB/model_even_smaller.bngl';

describe('Contact map reproduction', () => {
    it('should not produce edges with full-complex names', () => {
        const text = fs.readFileSync(MODEL_PATH, 'utf8');
        const res = parseBNGLWithANTLR(text);
        expect(res.success).toBe(true);
        const model = res.model!;
        const contact = buildContactMap(model.reactionRules, model.moleculeTypes);
        console.log('edges', contact.edges);
        console.log('nodes', contact.nodes);
        // verify no edge.from contains a '(' which indicates a full pattern
        contact.edges.forEach(e => {
            expect(e.from).not.toMatch(/\(/);
            expect(e.to).not.toMatch(/\(/);
        });
    });
});
