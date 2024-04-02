import { context } from 'esbuild';
import prepareBuild from './esbuild.common.js';

const options = await prepareBuild({
  entryNames: '[dir]/[name]',
  minify: false,
});

const ctx = await context(options);

await ctx.watch();
// eslint-disable-next-line no-console
console.log('watching...');
