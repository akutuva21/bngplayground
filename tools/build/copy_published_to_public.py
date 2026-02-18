#!/usr/bin/env python3
"""
Copy `published-models/` into `public/models/` with filename/path sanitization to
avoid Windows path/character issues (commas, colons, long names, etc.).

- Preserves directory structure relative to `published-models/`, but sanitizes
  each path segment.
- On write error, falls back to placing the file at `public/models/<basename>`.
- Writes `public/models/copy_manifest.txt` mapping original -> dest and
  `public/models/copy_errors.txt` for failures.
"""
from pathlib import Path
import shutil
import os
import re

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'published-models'
DST_BASE = ROOT / 'public' / 'models'
DST_BASE.mkdir(parents=True, exist_ok=True)
MANIFEST = DST_BASE / 'copy_manifest.txt'
ERRORS = DST_BASE / 'copy_errors.txt'

# Sanitization: remove or replace problematic characters, shorten segments if needed
def sanitize_segment(s: str) -> str:
    s = s.strip()
    # replace commas and colons and slashes; replace spaces with underscores
    s = s.replace(',', '').replace(':', '').replace('/', '_')
    s = s.replace(' ', '_')
    s = s.replace('\u2013', '-').replace('\u2014', '-')
    # remove control chars and some punctuation
    s = re.sub(r'[<>"\\\|\?\*]', '', s)
    # collapse multiple underscores
    s = re.sub(r'_+', '_', s)
    # trim to reasonable length to avoid path length issues
    if len(s) > 120:
        s = s[:120]
    return s

manifest_lines = []
error_lines = []
count = 0
for p in SRC.rglob('*'):
    if p.is_dir():
        continue
    rel = p.relative_to(SRC)
    parts = [sanitize_segment(part) for part in rel.parts]
    dest = DST_BASE.joinpath(*parts)
    try:
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(p, dest)
        manifest_lines.append(f"OK\t{p}\t{dest}\n")
        count += 1
    except Exception as e:
        # fallback: try writing to DST_BASE/<basename>
        try:
            fallback = DST_BASE / sanitize_segment(p.name)
            shutil.copy2(p, fallback)
            manifest_lines.append(f"FALLBACK\t{p}\t{fallback}\tERR={e}\n")
            count += 1
        except Exception as e2:
            error_lines.append(f"FAILED\t{p}\terr={e2}\n")

# write logs
with open(MANIFEST, 'w', encoding='utf-8') as fh:
    fh.writelines(manifest_lines)
with open(ERRORS, 'w', encoding='utf-8') as fh:
    fh.writelines(error_lines)

print(f"Copied {count} files to {DST_BASE}")
print(f"Manifest: {MANIFEST}")
if error_lines:
    print(f"Errors: {ERRORS} ({len(error_lines)} failures)")
else:
    print('No copy errors')
