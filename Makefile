.PHONY: dev build test wasm clean manifest

dev:
	npm run dev

build: manifest
	npm run build

test:
	npm run test

manifest:
	npm run generate:manifest

wasm:
	cd wasm-sundials && ./build_wasm.sh

clean:
	rm -rf dist node_modules/.vite
