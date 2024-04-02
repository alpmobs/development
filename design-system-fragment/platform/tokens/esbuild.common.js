import { join } from 'node:path';
import { rm } from 'node:fs/promises';
import { build, analyzeMetafile } from 'esbuild';
import glob from 'glob';

export default async function buildFiles(options) {
  const OUTPUT_DIR = 'dist';
  const outdir = join(process.cwd(), OUTPUT_DIR);

  // Remove the `OUTPUT_DIR` and all the files inside it
  await rm(outdir, {
    recursive: true,
    force: true,
  });

  // Create an array that contains the name of all files
  const entryPoints = glob.sync('assets/themes/*/styles.css', {});

  // Start building
  const buildResult = await build({
    outdir,
    entryNames: '[dir].[hash]',
    entryPoints,
    minify: true,
    loader: {
      '.png': 'file',
      '.jpg': 'file',
      '.jpeg': 'file',
      '.gif': 'file',
      '.svg': 'dataurl',
      '.ttf': 'file',
    },
    bundle: true,
    write: true,
    metafile: true,
    ...options,
  });

  console.log('[INFO] Successfully built files', await analyzeMetafile(buildResult.metafile));

  return buildResult;
}
