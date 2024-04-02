import { THEMES, esTokensConfig } from './_common.config.js';

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

export const FILE_NAME_PREFIX = 'list';
export const DESTINATION_FILE_NAME = `${FILE_NAME_PREFIX}.tokens.js`;

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
export const styleDictionaryConfig = (theme) => esTokensConfig({
  theme,
  FILE_NAME_PREFIX,
  DESTINATION_FILE_NAME,
});
