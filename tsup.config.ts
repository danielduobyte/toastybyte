import { defineConfig } from 'tsup';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  minify: false,
  async onSuccess() {
    await execAsync('echo \'"use client";\'  | cat - dist/index.mjs > dist/temp.mjs && mv dist/temp.mjs dist/index.mjs');
    await execAsync('echo \'"use client";\'  | cat - dist/index.js > dist/temp.js && mv dist/temp.js dist/index.js');
    console.log('Added "use client" directives');

    const cssSource = path.join(__dirname, 'dist', 'index.css');
    const cssDest = path.join(__dirname, 'dist', 'toastybyte.css');

    if (fs.existsSync(cssSource)) {
      fs.copyFileSync(cssSource, cssDest);
      console.log('Created toastybyte.css from bundled index.css');
    } else {
      console.log('index.css not found, skipping CSS copy');
    }
  },
});
