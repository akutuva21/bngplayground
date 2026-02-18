import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const fsp = fs.promises;
(async function main(){
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const root = path.join(__dirname, '..', 'public', 'models');
  // helper to stat using fsp
  const exists = async p => { try{ await fsp.stat(p); return true;}catch(e){return false;} }
  if (! await exists(root)){
    console.error('public/models not found:', root); process.exit(1);
  }
  const imageExt = new Set(['.png','.jpg','.jpeg','.gif','.svg','.webp','.bmp','.ico']);
  let moved = 0, imagesDeleted = 0, otherDeleted = 0, conflicts = 0;
  

  // Walk recursively
  async function walk(dir){
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const e of entries){
      const p = path.join(dir, e.name);
      if (e.isDirectory()){
        await walk(p);
      } else if (e.isFile()){
        const ext = path.extname(e.name).toLowerCase();
        if (ext === '.bngl'){
          // if already at root, skip
          if (path.resolve(dir) === path.resolve(root)) continue;
          let destName = e.name;
          let dest = path.join(root, destName);
          let i = 1;
          while (await exists(dest)){
            // collision -> append suffix
            const base = path.basename(e.name, ext);
            destName = `${base}-${i}${ext}`;
            dest = path.join(root, destName);
            i++; conflicts++;
          }
          await fsp.rename(p, dest);
          moved++;
        } else if (imageExt.has(ext)){
          // delete image
          await fsp.unlink(p).catch(()=>{});
          imagesDeleted++;
        } else {
          // delete other non-bngl files inside public/models (per request)
          await fsp.unlink(p).catch(()=>{});
          otherDeleted++;
        }
      }
    }
  }

  await walk(root);

  // Remove empty subdirectories under root
  async function removeEmptyDirs(dir){
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const e of entries){
      const p = path.join(dir, e.name);
      if (e.isDirectory()){
        await removeEmptyDirs(p);
        // check if empty
        const remaining = await fsp.readdir(p).catch(()=>[]);
        if (remaining.length === 0){
          await fsp.rmdir(p).catch(()=>{});
        }
      }
    }
  }
  await removeEmptyDirs(root);

  // Also delete any images directly in root (in case any remained)
  const rootFiles = await fsp.readdir(root, { withFileTypes: true });
  for (const e of rootFiles){
    if (e.isFile()){
      const ext = path.extname(e.name).toLowerCase();
      if (imageExt.has(ext)){
        await fsp.unlink(path.join(root,e.name)).catch(()=>{}); imagesDeleted++;
      } else if (ext !== '.bngl'){
        // remove any non-bngl files at root
        await fsp.unlink(path.join(root,e.name)).catch(()=>{}); otherDeleted++;
      }
    }
  }

  console.log(JSON.stringify({moved, imagesDeleted, otherDeleted, conflicts}, null, 2));
})();