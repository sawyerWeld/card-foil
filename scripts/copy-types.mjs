import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(scriptDir, '..');
const distDir = resolve(rootDir, 'dist');

mkdirSync(distDir, { recursive: true });

for (const fileName of ['index.d.ts', 'react.d.ts']) {
  copyFileSync(resolve(rootDir, 'src', fileName), resolve(distDir, fileName));
}
