import { build, analyzeMetafile } from 'esbuild';
import prepareBuild from './esbuild.common.js';

const options = await prepareBuild();

const buildResult = await build(options);

// eslint-disable-next-line no-console
console.log('[INFO] Successfully built files', await analyzeMetafile(buildResult.metafile));
