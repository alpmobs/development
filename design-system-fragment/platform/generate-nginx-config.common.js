import { join } from 'node:path';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import * as glob from 'glob';

async function getLocationsTokenAsset() {
  const buildDir = join(process.cwd(), 'tokens', 'dist');

  const tokenParams = (theme, fileName) => `    location = /${theme.toUpperCase()} {
        default_type text/html;
        return 200 "<link class='spark-tokens' rel='stylesheet' href='/fragment/design-system/assets/tokens/${fileName}'>";
    }`;

  const locations = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const filename of await readdir(buildDir)) {
    const arrFilename = filename.split('.');

    // skip processing all files that doesn't end in `css` extension
    if (arrFilename.lastIndexOf('css') === -1) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const theme = arrFilename[0];

    locations.push(tokenParams(theme, filename));
  }

  return locations;
}

function getLocationComponentAssets() {
  const buildDir = join(process.cwd(), 'components', 'dist');
  const components = glob.sync(`${buildDir}/components/**/*.js`).reduce((componentLists, componentPath) => {
    const [component, componentFile] = componentPath.split('/').slice(-2);

    // this will make sure that we only generate a valid component unto the nginx config
    //    Regex `test` returns
    //      /link.js = true
    //      /link.5J7ARPHY.js = true
    //      /link.styles.GELCX7DZ.js = false
    //      /link.test.TY3ZH36U.js = false
    if ((/\/([a-z]+)(\.[\dA-Z]+)*(\.js)/.test(`/${componentFile}`)) === false) {
      // return and don't process since it is not a component
      return componentLists;
    }

    componentLists[`@spark/components/${component}`] = `/fragment/design-system/assets/components/${component}/${componentFile}`;

    return componentLists;
  }, {});

  return `    location ~ ^/components { 
        default_type text/html; 
        return 200 '<script class="spark-components" type="importmap">{"imports": ${JSON.stringify(components)}}</script>'; 
    }`;
}

function errorPage403() {
  return `
    error_page 403 /403.html;

    location = /403.html {
        default_type text/html;

        return 200 "<script class='design-system-fragment'>console.error('design-system-fragment: Probably missing asset.')</script>";
    }
  `;
}

export default async function generateNginxConf(nginxConfigDir, { env }) {
  await mkdir(nginxConfigDir, { recursive: true }).then(() => console.log('[INFO] Successfully created dir:', nginxConfigDir));

  const tokenAssets = await getLocationsTokenAsset();

  const devConfig = () => {
    let config = '';

    if (env === 'development') {
      config = `
    # CORS issue fix
    add_header 'Access-Control-Allow-Origin' *;
    add_header 'Access-Control-Allow-Methods' 'GET';
    add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
`;
    }

    return config;
  };

  return writeFile(
    join(nginxConfigDir, '8081_fragment.conf'),
    `server {
    listen 8081;

    server_name localhost fragment-design-system;

    root /opt/app-root/src/platform;

    ${errorPage403()}

    # Used as readinessProbe for kubernetes
    location ~ ^/ping {
        default_type text/plain;
        
        return 200 "";
    }
    
    include /etc/nginx/nginx-node.conf;

    ${devConfig()}

    #============================================
    # Components
    #============================================
    # Handle component calls from local testing
    location ~ ^/fragment/(.*)/assets/components { 
        rewrite ^/fragment/(.*)/assets/components/(.*) /components/dist/components/$2 break; 
    }
    
    # Handle component calls from webfront 
    location ~ ^/build/components { 
        rewrite ^/build/components/(.*) /components/dist/components/$1 break; 
    }

    #============================================
    # TOKENS
    #============================================
    # Handle token calls from local testing
    location ~ ^/fragment/(.*)/assets/tokens {
        rewrite ^/fragment/(.*)/assets/tokens/(.*) /tokens/dist/$2 break;
    }
    
    # Handle token calls from webfront
    location ~ ^/build/tokens {
        rewrite ^/build/tokens/(.*) /tokens/dist/$1 break;
    }

    # Host static .css and .js/.mjs files
    location ~ .(css|js|mjs)$ {
        try_files $uri =404;
    }
    
    
    #============================================
    # Components
    #============================================
${await getLocationComponentAssets()}
    
    #============================================
    # Tokens
    #============================================
    # Slug for token e.g. /token?theme=VERAJOHN_COM
    location ~ ^/tokens {
        rewrite . /$arg_theme last;
    }

${tokenAssets.join('\n\n')}
}`,
  ).then(() => {
    console.log(`[INFO] Successfully generated nginx configuration file at: "${nginxConfigDir}"`);
  }).catch((error) => {
    console.error('[ERROR] Details: ', error);
  });
}
