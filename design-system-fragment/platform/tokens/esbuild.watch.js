import buildFiles from './esbuild.common.js';

buildFiles({
  entryNames: '[dir]',
  minify: false,
  watch: {
    onRebuild(error, result) {
      if (error) console.error('[ERROR] watch build failed:', error);
      else console.log('[INFO] watch build succeeded:', result);
    },
  },
}).then(() => {
  console.log('[INFO] watching...');
});
