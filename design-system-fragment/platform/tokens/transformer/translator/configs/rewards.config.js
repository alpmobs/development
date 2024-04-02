import { esTokensConfig, THEMES } from './_common.config.js';

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

export const FILE_NAME_PREFIX = 'rewards';
export const DESTINATION_FILE_NAME = `${FILE_NAME_PREFIX}.tokens.js`;

export const styleDictionaryConfig = (theme) => esTokensConfig({
  theme,
  FILE_NAME_PREFIX,
  DESTINATION_FILE_NAME,
});
