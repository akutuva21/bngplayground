
import fs from 'fs';
import path from 'path';
import { parseBNGLStrict as parseBNGLModel } from '../src/parser/BNGLParserWrapper';
import { NetworkGenerator } from '../src/services/graph/NetworkGenerator';
import { BNGLParser } from '../src/services/graph/core/BNGLParser';
import { GraphCanonicalizer } from '../src/services/graph/core/Canonical';

async function main() {
    try {
        const bnglPath = path.resolve('public/models/Lang_2024.bngl');
        const content = fs.readFileSync(bnglPath, 'utf-8');
        const inputModel = parseBNGLModel(content);

        // Convert parsed model to NetworkGenerator internal format
        const seedSpecies = inputModel.species.map(s => BNGLParser.parseSpeciesGraph(s.name));

        const rules = inputModel.reactionRules.flatMap(r => {
            // simplified rule conversion
            const ruleStr = `${r.reactants.join(' + ')} -> ${r.products.join(' + ')}`;
            const rate = typeof r.rate === 'number' ? r.rate : 0; // Assume 0 if expr for now (Lang has no functional rates?)
            // Actually Lang likely has constant rates?
            // If rate is expression "k1*2", it stays 0 here.
            // But for network generation, rate value mainly matters if it's 0 (maybe skip?).
            // Network topology doesn't depend on rate VALUE, generally.
            // Except for reversible?
            const ruleObj = BNGLParser.parseRxnRule(ruleStr, rate, r.name);
            if (r.isBidirectional) {
                const revStr = `${r.products.join(' + ')} -> ${r.reactants.join(' + ')}`;
                const revRule = BNGLParser.parseRxnRule(revStr, rate, r.name + '_rev');
                return [ruleObj, revRule];
            }
            return [ruleObj];
        });

        const generator = new NetworkGenerator({
            maxSpecies: 4000, // Lang has ~400
            maxIterations: 20,
        });

        console.log("Generating network...");
        // Suppress console logs from generator if possible
        const res = await generator.generate(seedSpecies, rules, () => { });

        console.log(`Generated ${res.species.length} species.`);

        if (res.species.length > 55) {
            const s55 = res.species[55];
            const canonical = GraphCanonicalizer.canonicalize(s55.graph);
            console.log("\n--- SPECIES 55 ---");
            console.log("Name/Graph:", s55.toString());
            console.log("Canonical:", canonical);
            console.log("Expected Pattern: @cell:TP53(DBD,Ser15~p)");

            // Check match visually or programmatically
            if (canonical.includes("TP53") && canonical.includes("Ser15~p")) {
                console.log("VERDICT: Species 55 IS TP53(Ser15~p).");
            } else {
                console.log("VERDICT: Species 55 IS NOT TP53(Ser15~p). WARNING!");
            }
        } else {
            console.log("Not enough species generated.");
        }

    } catch (e) {
        console.error("Error:", e);
    }
}

main();
