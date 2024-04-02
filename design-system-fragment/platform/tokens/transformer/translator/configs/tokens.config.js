import { getBuildPath, THEMES, TOKEN_PREFIX } from './_common.config.js';

/**
 * List of supported themes
 *
 * @type {string[]}
 */
export const SUPPORTED_THEMES = [
  THEMES.IC,
  THEMES.ICJP,
  THEMES.ICSE,
  THEMES.VJ,
  THEMES.VJJP,
  THEMES.VJSE,
  THEMES.YGD,
  THEMES.HL,
  THEMES.LCH,
  THEMES.BOA,
];

/**
 * Config to tell the style-dictionary where is which
 *
 * All available config can be found here:
 *   [Style Dictionary Config](https://amzn.github.io/style-dictionary/#/config)
 *
 * **NOTE:** Path is relative to `./tokens` folder.
 *  Why is that? Because the build script resides in the `package.json`
 *  and `package.json` file is under `./tokens` :)
 */
export const styleDictionaryConfig = (theme) => ({
  source: [`./storage/${theme}/*/*.tokens.json`],
  platforms: {
    css: {
      transformGroup: 'css-custom',
      prefix: TOKEN_PREFIX,
      buildPath: getBuildPath(theme),
      files: [
        {
          destination: '_tokens.css',
          format: 'css/variables',
          filter: 'purposeTokenOnly',
        },
      ],
    },
  },
});
