
import { BNGXMLWriter } from '../services/simulation/BNGXMLWriter';
import { BNGLParserWrapper } from '../src/parser/BNGLParserWrapper';
import * as fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

async function main() {
    const bnglPath = 'public/models/Model_ZAP.bngl';
    const bnglCode = fs.readFileSync(bnglPath, 'utf-8');
    
    console.log('Parsing BNGL...');
    const model = BNGLParserWrapper.parseBNGLStrict(bnglCode);
    
    console.log('Generating BNGXML...');
    const xml = BNGXMLWriter.write(model);
    
    const xmlPath = 'debug_model_zap_full.xml';
    fs.writeFileSync(xmlPath, xml);
    console.log(`Saved XML to ${xmlPath}`);
    
    const nfsimPath = 'bionetgen_python/bng-win/bin/NFsim.exe';
    console.log(`Running NFsim from ${nfsimPath}...`);
    
    try {
        const cmd = `"${nfsimPath}" -xml ${xmlPath} -t 100 -n 100 -v`;
        const output = execSync(cmd, { encoding: 'utf-8' });
        console.log('NFsim Output:');
        console.log(output);
    } catch (error: any) {
        console.error('NFsim failed:');
        console.error(error.stdout);
        console.error(error.stderr);
    }
}

main().catch(console.error);
