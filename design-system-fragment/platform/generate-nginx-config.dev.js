import { join } from 'node:path';
import generateNginxConf from './generate-nginx-config.common.js';

const nginxConfigDir = join(process.cwd(), '../', 'docker', 'nginx', 'fragment-sites-enabled');

generateNginxConf(nginxConfigDir, { env: 'development' });
