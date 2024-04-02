import glob from 'glob';
import StyleDictionary from 'style-dictionary';
import tinycolor from 'tinycolor2';

/**
 * Tell the translator that only `purpose token`
 * will be translated into CSS variables
 */
StyleDictionary.registerFilter({
  name: 'purposeTokenOnly',
  matcher(token) {
    return token.filePath.match(/\/purpose\//);
  },
});

/**
 * Register a new format to import the tokens in the unit test
 *
 * Tokens are converted to es-module module
 *    `export default {"spk-color-text-primary":"#28113c"}`
 */
StyleDictionary.registerFormat({
  name: 'javascript/es-module-flat',
  formatter({ dictionary, file }) {
    const { fileHeader } = StyleDictionary.formatHelpers;
    const tokens = JSON.stringify(
      Object.fromEntries(
        dictionary.allTokens.map(({ name, value }) => [
          // this will convert PascalCase to kebab-case
          // e.g. `SpkColorTextPrimary` to `spk-color-text-primary`
          name.replace(/[A-Z](?![a-z])|[A-Z]|\d/g, (str, separator) => (separator ? '-' : '') + str.toLowerCase()),
          value,
        ]),
      ),
    );

    return `${fileHeader({ file })}
export default ${tokens}`;
  },
});

/**
 * This overrides the `transform` `color/css`
 * to support css gradient
 */
StyleDictionary.registerTransform({
  name: 'color/css-with-gradient',
  type: 'value',
  matcher(token) {
    return token.attributes.category === 'color';
  },
  transformer(token) {
    // don't process the gradient
    // return as is
    if (token.attributes.type === 'gradient') {
      return token.value;
    }

    const color = tinycolor(token.value);
    if (color.getAlpha() === 1) {
      return color.toHexString();
    }
    return color.toRgbString();
  },
});

/**
 * Overrides the `transformGroup` called `css`
 *  original group can be found here: https://amzn.github.io/style-dictionary/#/transform_groups?id=css
 */
StyleDictionary.registerTransformGroup({
  name: 'css-custom',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/px',
    'color/css-with-gradient',
  ],
});

/**
 * Get all config files under ./configs folder except configs with underscore(_)
 */
const translatorConfigs = glob
  .sync('./transformer/translator/configs/*.config.js', {
    ignore: './transformer/translator/configs/_*.config.js',
  }).map((config) => {
    // `config` e.g. value: `./transformer/translator/configs/color.config.js`
    // Remove the first and second path of the config
    //   so that the output will be `./config/color.config.js`
    return `./${config.split('/').slice(-2).join('/')}`;
  });

/**
 * Translate the tokens using the supplied translator configs
 */
translatorConfigs.forEach(async (config) => {
  const { styleDictionaryConfig, SUPPORTED_THEMES } = await import(config);

  console.log('===================START STYLE DICTIONARY============================');
  console.log(`Translating ${config}.tokens.json to CSS variables`);

  SUPPORTED_THEMES.forEach((themeCode) => {
    console.log('.\n.\n.\n.\n.');
    console.log(`[INFO] Processing: [${themeCode}]`);

    try {
      StyleDictionary.extend(styleDictionaryConfig(themeCode)).buildAllPlatforms();
    } catch (err) {
      console.log('\n\n\n');
      console.log('\x1b[31m%s\x1b[0m', `[ERROR] There's an error processing: ${themeCode}, Please refer above console`);
      throw Error(err);
    }

    console.log(`[INFO] Success: [${themeCode}]`);
  });

  console.log('.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.');
});
