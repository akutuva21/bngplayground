import fs from 'fs';
import path from 'path';

interface ModelMetadata {
  file: string;
  id: string;
  name: string;
  description: string;
  tags: string[];
  bng2_compatible: boolean;
}

interface PlaygroundFile {
  models: ModelMetadata[];
}

interface ManifestEntry extends ModelMetadata {
  path: string;
}

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'model-manifest.json');

function parseYaml(content: string): any {
  // Ultra-simple YAML parser for basic playground.yaml structure
  // Handles 'models:' key and list of objects with fields
  const lines = content.split('\n');
  const result: any = { models: [] };
  let currentModel: any = null;

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;

    if (line.startsWith('models:')) continue;

    if (line.startsWith('-')) {
      if (currentModel) result.models.push(currentModel);
      currentModel = {};
      line = line.substring(1).trim();
    }

    if (currentModel && line.includes(':')) {
      const parts = line.split(':');
      const key = parts[0].trim();
      let val: any = parts.slice(1).join(':').trim();

      // Handle arrays [a, b]
      if (val.startsWith('[') && val.endsWith(']')) {
        val = val.substring(1, val.length - 1).split(',').map((v: string) => v.trim());
      } else if (val === 'true') {
        val = true;
      } else if (val === 'false') {
        val = false;
      } else if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      
      currentModel[key] = val;
    }
  }
  if (currentModel) result.models.push(currentModel);
  return result;
}

function findPlaygroundFiles(dir: string, results: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file === 'node_modules' || file === '.git' || file === 'public') continue;
      findPlaygroundFiles(fullPath, results);
    } else if (file === 'playground.yaml') {
      results.push(fullPath);
    }
  }
  return results;
}

function main() {
  console.log('Generating model manifest...');
  const playgroundFiles = findPlaygroundFiles(ROOT_DIR);
  const allModels: ManifestEntry[] = [];

  for (const file of playgroundFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const data = parseYaml(content) as PlaygroundFile;
    const dir = path.dirname(file);
    const relativeDir = path.relative(ROOT_DIR, dir);

    for (const model of data.models) {
      allModels.push({
        ...model,
        path: path.join(relativeDir, model.file).replace(/\\/g, '/')
      });
    }
  }

  const manifest = {
    models: allModels,
    generated: new Date().toISOString()
  };

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR);
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
  console.log(`Generated manifest with ${allModels.length} models at ${OUTPUT_FILE}`);
}

main();
