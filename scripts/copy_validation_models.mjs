import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const CONSTANTS_PATH = path.join(PROJECT_ROOT, 'constants.ts');
const DEST_DIR = path.join(PROJECT_ROOT, 'published-models', 'validation');

if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

let content = fs.readFileSync(CONSTANTS_PATH, 'utf8');

// Find all imports from ./public/models/
const regex = /import\s+(\w+)\s+from\s+['"]\.\/public\/models\/([^'"]+)['"]/g;

let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
    const importName = match[1];
    const fileNameRaw = match[2];
    // Remove query params if any (e.g. ?raw)
    const fileName = fileNameRaw.split('?')[0];

    const srcPath = path.join(PROJECT_ROOT, 'public', 'models', fileName);
    const destPath = path.join(DEST_DIR, fileName);

    if (fs.existsSync(srcPath)) {
        console.log(`Copying ${fileName} to ${DEST_DIR}`);
        fs.copyFileSync(srcPath, destPath);
        count++;
    } else {
        console.warn(`Warning: Source file not found: ${srcPath}`);
    }
}

console.log(`Copied ${count} models.`);

// Now replace imports in content
const newContent = content.replace(/from\s+['"]\.\/public\/models\//g, "from './published-models/validation/");

fs.writeFileSync(CONSTANTS_PATH, newContent, 'utf8');
console.log("Updated constants.ts imports.");
