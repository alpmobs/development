import { join } from 'node:path';
import { rm } from 'node:fs/promises';
import * as glob from 'glob';

export default async function prepareBuild(optionsOverride) {
  const OUTPUT_DIR = 'dist';
  const outdir = join(process.cwd(), OUTPUT_DIR);

  // Remove the `OUTPUT_DIR` and all the files inside it
  await rm(outdir, {
    recursive: true,
    force: true,
  });

  // Create an array that contains the name of all files
  const entryPoints = glob.sync('src/**/*.ts', {});

  // return esbuild options
  return {
    outdir,
    entryNames: '[dir]/[name].[hash]',
    entryPoints,
    outbase: 'src',
    minify: true,
    loader: {
      '.ts': 'ts',
      '.png': 'file',
      '.jpg': 'file',
      '.jpeg': 'file',
      '.gif': 'file',
      '.svg': 'file',
    },
    bundle: true,
    write: true,
    metafile: true,
    sourcemap: true,
    format: 'esm',
    ...optionsOverride,
  };
}
