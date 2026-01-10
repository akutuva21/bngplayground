
import fs from 'fs';
import path from 'path';
import { BNGLParser } from '../src/services/graph/core/BNGLParser';
import { NetworkGenerator } from '../src/services/graph/NetworkGenerator';
// Polyfills might be needed if these use 'self' or similar, but unlikely for core logic.

async function main() {
    const bnglPath = path.resolve('public/models/Lang_2024.bngl');
    const bnglContent = fs.readFileSync(bnglPath, 'utf-8');

    // 1. Parse
    const parser = new BNGLParser(bnglContent);
    const model = parser.parse();

    console.log(`Parsed model with ${model.seedSpecies.length} seed species and ${model.rxnRules.length} rules.`);

    // 2. Generate Network
    const generator = new NetworkGenerator(model);
    // Generator usually has a generate() method.
    // I need to check how bnglWorker calls it.
    // bnglWorker.ts: const expandedModel = await generateExpandedNetwork(jobId, inputModel);
    // generateExpandedNetwork likely calls generator.generate().
    // Let's assume generator.generate() exists and works.

    // We need to configure max iter / max species if needed.
    // defaults should be fine for this model?

    // Actually, NetworkGenerator.ts export class NetworkGenerator
    // It has generate() method?
    // Let's suspect it does.

    console.log("Generating network...");
    // Note: generate() might be async or sync.
    // Looking at the file content glimpse, it's not obvious.
    // But bnglWorker calls await generateExpandedNetwork.

    // Let's try calling it.
    try {
        const result = generator.generate();
        // If it's a promise, we await.
        // If it returns { species, reactions }, we check that.

        let speciesList = [];
        if (result && result.species) {
            speciesList = result.species;
        } else if (result instanceof Promise) {
            const res = await result;
            speciesList = res.species;
        } else {
            // Maybe accessed via generator.getSpecies()?
            // Inspecting result keys might help if this fails.
            console.log("Generator returned:", Object.keys(result || {}));
            speciesList = result.species || generator.getSpecies?.() || [];
        }

        console.log(`Generated ${speciesList.length} species.`);

        if (speciesList.length > 55) {
            const s55 = speciesList[55];
            console.log(`\nSpecies Index 55:`);
            console.log(`Name: ${s55.name || s55.toString()}`);
            console.log(`Canonical: ${s55.canonicalString || s55.toCanonical?.() || "N/A"}`);

            const intended = "@cell:TP53(DBD,Ser15~p)";
            console.log(`\nIntended Target: ${intended}`);

            const matches = (s55.name || "").includes(intended) || (s55.canonicalString || "").includes(intended);
            console.log(`Match? ${matches ? "YES" : "NO"}`);

            // normalize compartment syntax @cell: vs @cell::
            // Code uses normalizeCompartmentSyntax in bnglWorker.
        } else {
            console.log("Species list too short!");
        }

    } catch (e) {
        console.error("Error generating network:", e);
    }
}

main();
