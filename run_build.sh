#!/bin/bash
set -e
echo "Building BNG Playground..."
npm ci
npm run generate:manifest
npm run build
echo "Build complete. Run 'npm run preview' to test."
