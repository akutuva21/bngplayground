/**
 * Copy all example models from example-models/ to public/models/
 * This makes them available in the web UI model picker
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(PROJECT_ROOT, 'example-models');
const TARGET_DIR = path.join(PROJECT_ROOT, 'public', 'models');

console.log('='.repeat(80));
console.log('Copy Example Models to public/models/');
console.log('='.repeat(80));
console.log(`Source: ${SOURCE_DIR}`);
console.log(`Target: ${TARGET_DIR}`);
console.log('');

if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`ERROR: Source directory not found: ${SOURCE_DIR}`); process.exit(1);
}

// Ensure target directory exists
fs.mkdirSync(TARGET_DIR, { recursive: true });

// Get all .bngl files from source
const bnglFiles = fs.readdirSync(SOURCE_DIR)
    .filter(f => f.endsWith('.bngl'))
    .sort();

console.log(`Found ${bnglFiles.length} BNGL files in source directory\n`);

let copiedCount = 0;
let skippedCount = 0;
let updatedCount = 0;

for (const file of bnglFiles) {
    const sourcePath = path.join(SOURCE_DIR, file);
    const targetPath = path.join(TARGET_DIR, file);
    
    const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
    
    if (fs.existsSync(targetPath)) {
        const targetContent = fs.readFileSync(targetPath, 'utf-8');
        
        if (sourceContent === targetContent) {
            console.log(`  ⏭  SKIP: ${file} (already exists, identical)`);
            skippedCount++;
        } else {
            fs.writeFileSync(targetPath, sourceContent, 'utf-8');
            console.log(`  ♻️  UPDATE: ${file} (content changed)`);
            updatedCount++;
        }
    } else {
        fs.writeFileSync(targetPath, sourceContent, 'utf-8');
        console.log(`  ✅ COPY: ${file} (new)`);
        copiedCount++;
    }
}

console.log('\n' + '='.repeat(80));
console.log('Copy Summary');
console.log('='.repeat(80));
console.log(`Total Files: ${bnglFiles.length}`);
console.log(`  ✅ New: ${copiedCount}`);
console.log(`  ♻️  Updated: ${updatedCount}`);
console.log(`  ⏭  Skipped: ${skippedCount}`);
console.log('');
console.log(`✓ All example models successfully deployed to public/models/`);
