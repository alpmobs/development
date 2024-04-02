import buildFiles from './esbuild.common.js';

buildFiles({
  entryNames: '[dir]',
  minify: false,
});
