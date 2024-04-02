//=======================================================================
//
// Put all the common configs here.
// This file is only read by the configs and will not translate tokens
//
//=======================================================================
export const TOKEN_PREFIX = 'spk';
export const getBuildPath = (theme) => `./assets/themes/${theme}/`;

export const THEMES = {
  IC: 'intercasino_com',
  ICJP: 'intercasino_jp',
  ICSE: 'intercasino_se',
  VJ: 'verajohn_com',
  VJJP: 'verajohn_jp',
  VJSE: 'verajohn_se',
  YGD: 'yuugado_com',
  HL: 'happyluke_com',
  LCH: 'livecasinohouse_com',
  BOA: 'boabet',
};

/**
 * Common config to translate tokens into an es-module
 *  e.g. export default {"ds-color-text-primary":"#333333"}
 *
 * All available config can be found here:
 *   [Style Dictionary Config](https://amzn.github.io/style-dictionary/#/config)
 *
 * **NOTE:** Path is relative to `./tokens` folder.
 *  Why is that? Because the build script resides in the `package.json`
 *  and `package.json` file is under `./tokens` :)
 */
export const esTokensConfig = ({
  theme,
  FILE_NAME_PREFIX,
  DESTINATION_FILE_NAME,
}) => ({
  source: [
    `./storage/${theme}/brand/*.tokens.json`,
    `./storage/${theme}/purpose/${FILE_NAME_PREFIX}.tokens.json`,
  ],
  platforms: {
    js: {
      transformGroup: 'js',
      prefix: TOKEN_PREFIX,
      buildPath: getBuildPath(theme),
      files: [
        {
          destination: DESTINATION_FILE_NAME,
          format: 'javascript/es-module-flat',
          filter: 'purposeTokenOnly',
        },
      ],
    },
  },
});
