import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODELS_DIR = path.join(__dirname, '../public/published-models');
const OUTPUT_FILE = path.join(__dirname, '../public/models.json');

function getModelFiles(dir) {
  const results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat && stat.isDirectory()) {
        const children = getModelFiles(filePath);
        if (children.length > 0) {
          results.push({
            type: 'category',
            name: file,
            children: children
          });
        }
      } else {
        if (file.endsWith('.bngl')) {
          results.push({
            type: 'model',
            name: file.replace('.bngl', ''),
            path: path.relative(path.join(__dirname, '../public'), filePath).replace(/\\/g, '/')
          });
        }
      }
    });
  } catch (e) {
    console.warn(`Skipping directory ${dir}: ${e.message}`);
  }
  return results;
}

try {
  if (!fs.existsSync(MODELS_DIR)) {
    console.error(`Directory not found: ${MODELS_DIR}`);
    process.exit(1);
  }

  const modelTree = getModelFiles(MODELS_DIR);
  // Sort
  modelTree.sort((a, b) => a.name.localeCompare(b.name));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(modelTree, null, 2));
  console.log(`Generated model manifest at ${OUTPUT_FILE}`);
  console.log(`Found ${modelTree.length} top-level categories.`);
} catch (error) {
  console.error('Error generating manifest:', error);
  process.exit(1);
}
