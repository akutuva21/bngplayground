/**
 * Test failing models with BNG2.pl to determine ground truth
 * Models that pass BNG2.pl but fail our parser need grammar fixes
 * Models that fail both are expected failures
 */
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { parseBNGLWithANTLR } from '../src/parser/BNGLParserWrapper';

const MODEL_NAMES = [
    'notch',
    'tlbr',
    'blbr',
    'fceri_2003',
    'Faeder_2003',
    'Jaruszewicz-Blonska_2023',
    'vilar_2002b',
    'vilar_2002c',
    'wnt',
    'Hat_2016',
    'Dushek_2011',
    'Dushek_2014',
    'Kozer_2013',
    'Kozer_2014',
    'mapk-dimers',
    'mapk-monomers',
    'Nag_2009',
    'Zhang_2021',
    'Mertins_2023',
    'Erdem_2021',
    'Jung_2017',
    'Rule_based_Ran_transport',
    'Rule_based_egfr_compart',
    'BaruaBCR_2012',
];

function findModelFile(modelsDir: string, name: string): string | null {
    const categories = fs.readdirSync(modelsDir);
    for (const cat of categories) {
        const catPath = path.join(modelsDir, cat);
        if (!fs.statSync(catPath).isDirectory()) continue;
        const files = fs.readdirSync(catPath);
        for (const f of files) {
            if (f === `${name}.bngl`) {
                return path.join(catPath, f);
            }
        }
    }
    return null;
}

function testWithBNG2(modelPath: string): { success: boolean; error?: string } {
    try {
        // Try to parse with BNG2.pl (just generate network, minimal work)
        const result = execSync(
            `perl BNG2.pl --check "${modelPath}"`,
            { 
                timeout: 30000,
                encoding: 'utf-8',
                stdio: ['pipe', 'pipe', 'pipe']
            }
        );
        return { success: true };
    } catch (e: any) {
        // Check if it's a parse error vs runtime error
        const stderr = e.stderr || e.message || '';
        return { success: false, error: stderr.slice(0, 200) };
    }
}

async function run() {
    const projectRoot = process.cwd();
    const modelsDir = path.join(projectRoot, 'published-models');
    
    console.log('=== Testing Models: BNG2.pl vs ANTLR Parser ===\n');
    
    const results: { 
        model: string; 
        bng2: boolean; 
        antlr: boolean; 
        needsFix: boolean;
        bng2Error?: string;
        antlrError?: string;
    }[] = [];
    
    for (const modelName of MODEL_NAMES) {
        const fullPath = findModelFile(modelsDir, modelName);
        
        if (!fullPath) {
            console.log(`SKIP: ${modelName} - File not found`);
            continue;
        }
        
        // Test with BNG2.pl
        const bng2Result = testWithBNG2(fullPath);
        
        // Test with ANTLR
        let antlrSuccess = false;
        let antlrError: string | undefined;
        try {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const result = parseBNGLWithANTLR(content);
            antlrSuccess = result.success;
            if (!result.success) {
                antlrError = result.errors.slice(0, 2).map(e => `Line ${e.line}: ${e.message}`).join('; ');
            }
        } catch (e: any) {
            antlrError = e.message;
        }
        
        const needsFix = bng2Result.success && !antlrSuccess;
        
        const status = needsFix ? 'NEEDS FIX' : 
                       (bng2Result.success && antlrSuccess) ? 'BOTH PASS' :
                       (!bng2Result.success && !antlrSuccess) ? 'BOTH FAIL' : 'ANTLR ONLY';
        
        console.log(`${status}: ${modelName}`);
        if (needsFix && antlrError) {
            console.log(`  ANTLR: ${antlrError.slice(0, 80)}`);
        }
        
        results.push({
            model: modelName,
            bng2: bng2Result.success,
            antlr: antlrSuccess,
            needsFix,
            bng2Error: bng2Result.error,
            antlrError
        });
    }
    
    // Summary
    const bothPass = results.filter(r => r.bng2 && r.antlr).length;
    const needsFix = results.filter(r => r.needsFix).length;
    const bothFail = results.filter(r => !r.bng2 && !r.antlr).length;
    
    console.log(`\n=== Summary ===`);
    console.log(`Both Pass: ${bothPass}`);
    console.log(`NEEDS FIX (BNG2 passes, ANTLR fails): ${needsFix}`);
    console.log(`Both Fail (expected): ${bothFail}`);
    
    // Write detailed results
    fs.writeFileSync('bng2_comparison.json', JSON.stringify(results, null, 2));
    console.log('\nDetailed results written to bng2_comparison.json');
}

run().catch(console.error);
