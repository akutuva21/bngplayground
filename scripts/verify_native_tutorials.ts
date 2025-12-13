
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parseBNGL } from '../services/parseBNGL.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TUTORIALS_DIR = path.join(__dirname, '../published-models/native-tutorials');

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.bngl')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

async function main() {
  const files = getAllFiles(TUTORIALS_DIR);
  console.log(`Scanning ${files.length} native tutorial files...`);

  for (const filePath of files) {
      const code = fs.readFileSync(filePath, 'utf-8');
      const name = path.basename(filePath, '.bngl');
      
      try {
          const model = parseBNGL(code);
          // improve check: must have reaction rules OR be a valid empty model?
          // TranslateSBML probably doesn't have a model block or rules.
          
          if (!model.reactionRules || model.reactionRules.length === 0) {
              console.log(`[FAIL] ${name}: No reaction rules.`);
              continue;
          }
          
          // Check for simulate_nf or other unsupported
          // Actually, parser handles that?
          
          // console.log(`[PASS] ${name}: ${model.reactionRules.length} rules.`);
          
      } catch (e: any) {
          console.log(`[ERROR] ${name}: Parse failed - ${e.message}`);
      }
  }
}

main();
