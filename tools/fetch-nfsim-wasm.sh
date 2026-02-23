#!/bin/bash
# Fetch pre-built NFsim WASM from the latest CI artifact in akutuva21/nfsim.
# Requires GitHub CLI (gh): https://cli.github.com/
set -e

REPO="akutuva21/nfsim"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public"

echo "Fetching NFsim WASM from $REPO..."

# Option 1: From latest successful CI artifact
RUN_ID=$(gh run list \
  --repo "$REPO" \
  --workflow "Build NFsim WASM" \
  --status success \
  --limit 1 \
  --json databaseId \
  -q '.[0].databaseId' 2>/dev/null || true)

if [ -z "$RUN_ID" ]; then
  echo "No successful WASM build found in $REPO. Using existing public/ artifacts."
  exit 0
fi

TMP="$(mktemp -d)"
gh run download "$RUN_ID" --repo "$REPO" --name nfsim-wasm --dir "$TMP"

cp "$TMP/nfsim.js"   "$OUT_DIR/nfsim.js"
cp "$TMP/nfsim.wasm" "$OUT_DIR/nfsim.wasm"
rm -rf "$TMP"

echo "✓ Updated public/nfsim.js and public/nfsim.wasm from run $RUN_ID"
