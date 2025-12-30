
import * as fs from 'fs';
import * as path from 'path';
import { parseBNGLStrict } from '../src/parser/BNGLParserWrapper';
import { NetworkGenerator } from '../src/services/graph/NetworkGenerator';
import { NautyService } from '../src/services/graph/core/NautyService';
import { BNGLParser } from '../src/services/graph/core/BNGLParser';

async function run() {
    await NautyService.getInstance().init();
    const projectRoot = process.cwd();
    const modelsDir = path.join(projectRoot, 'published-models');

    const testModels = [
        { name: 'tlbr', path: path.join(modelsDir, 'immune-signaling', 'tlbr.bngl'), type: 'parser' },
        { name: 'Dolan_2015', path: path.join(modelsDir, 'literature', 'Dolan_2015.bngl'), type: 'parser' },
        { name: 'Hat_2016', path: path.join(modelsDir, 'cell-cycle', 'Hat_2016.bngl'), type: 'netgen' },
        { name: 'Jaruszewicz-Blonska_2023', path: path.join(modelsDir, 'immune-signaling', 'Jaruszewicz-Blonska_2023.bngl'), type: 'netgen' }
    ];

    for (const tm of testModels) {
        console.log(`\n=== Testing ${tm.name} (${tm.type}) ===`);
        try {
            const bnglContent = fs.readFileSync(tm.path, 'utf-8');
            const t0 = Date.now();
            const parsedModel = parseBNGLStrict(bnglContent);
            console.log(`Parsed successfully in ${Date.now() - t0}ms`);
            
            if (tm.name === 'tlbr') {
                 // Check if simulate_rm was parsed correctly?
                 // Just success is enough for now given grammar issues.
            }

            if (tm.type === 'netgen') {
                console.log('Generating network...');
                const seedSpecies = parsedModel.species.map(s => BNGLParser.parseSpeciesGraph(s.name));
                const parametersMap = new Map(Object.entries(parsedModel.parameters).map(([k, v]) => [k, Number(v)]));

                const rules = parsedModel.reactionRules.flatMap(r => {
                    let rate: number | string = r.rate;
                    try {
                        const val = BNGLParser.evaluateExpression(r.rate, parametersMap);
                        if (!isNaN(val)) rate = val;
                    } catch (e) {}

                    let reverseRate: number | string | undefined;
                    if (r.reverseRate) {
                        reverseRate = r.reverseRate;
                        try {
                            const val = BNGLParser.evaluateExpression(r.reverseRate, parametersMap);
                            if (!isNaN(val)) reverseRate = val;
                        } catch (e) {}
                    } else if (r.isBidirectional) {
                        reverseRate = rate;
                    }

                    const formatList = (list: string[]) => list.length > 0 ? list.join(' + ') : '0';
                    const ruleStr = `${formatList(r.reactants)} -> ${formatList(r.products)}`;
                    const forwardRule = BNGLParser.parseRxnRule(ruleStr, rate);
                    if (r.isBidirectional && reverseRate !== undefined) {
                        const reverseRuleStr = `${formatList(r.products)} -> ${formatList(r.reactants)}`;
                        const reverseRule = BNGLParser.parseRxnRule(reverseRuleStr, reverseRate);
                        return [forwardRule, reverseRule];
                    }
                    return [forwardRule];
                });

                const generator = new NetworkGenerator({
                    maxSpecies: 100, // Small limit for speed
                    maxIterations: 10
                });
                const net = await generator.generate(seedSpecies, rules);
                console.log(`Generated network: ${net.species.length} species, ${net.reactions.length} reactions.`);
                
                // Verify rateExpression presence in reactions if necessary
                const symbolicRxns = net.reactions.filter(r => r.rateExpression);
                if (symbolicRxns.length > 0) {
                    console.log(`Found ${symbolicRxns.length} reactions with symbolic rates.`);
                    console.log(`First symbolic rate: "${symbolicRxns[0].rateExpression}"`);
                } else {
                     console.log('No symbolic rates found (might be normal if rates evaluated to numbers).');
                }
            }
            console.log(`PASS: ${tm.name}`);

        } catch (e: any) {
            console.error(`FAIL: ${tm.name}`);
            console.error(e.message);
            if (e.message.includes('extraneous input')) {
                console.error("Parser Error Details:", e);
            }
        }
    }
}

run().catch(console.error);
