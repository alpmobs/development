import { join } from 'node:path';
import generateNginxConf from './generate-nginx-config.common.js';

const nginxConfigDir = join(process.cwd(), 'nginx', 'sites-enabled');

generateNginxConf(nginxConfigDir, { env: 'production' });
