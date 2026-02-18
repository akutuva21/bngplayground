import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const WEB_OUTPUT_DIR = path.join(ROOT, 'web_output');
const TARGET_EXTS = new Set(['.csv', '.cdat', '.net']);

function main() {
  if (!fs.existsSync(WEB_OUTPUT_DIR)) {
    console.log(`[clean:web-output] Directory not found, nothing to clean: ${WEB_OUTPUT_DIR}`);
    return;
  }

  let removed = 0;
  let kept = 0;

  for (const entry of fs.readdirSync(WEB_OUTPUT_DIR)) {
    const filePath = path.join(WEB_OUTPUT_DIR, entry);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const ext = path.extname(entry).toLowerCase();
    if (!TARGET_EXTS.has(ext)) {
      kept++;
      continue;
    }

    fs.unlinkSync(filePath);
    removed++;
  }

  console.log(`[clean:web-output] Removed ${removed} files (.csv/.cdat/.net), kept ${kept} non-target files.`);
}

main();
