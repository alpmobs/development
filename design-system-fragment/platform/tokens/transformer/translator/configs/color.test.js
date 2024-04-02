import { expect } from '@esm-bundle/chai';
import {
  DESTINATION_FILE_NAME, SUPPORTED_THEMES, styleDictionaryConfig, FILE_NAME_PREFIX,
} from './color.config.js';
import { commonConfigTest, findToken, importTokens } from './_helpers-test.js';

commonConfigTest({
  DESTINATION_FILE_NAME,
  SUPPORTED_THEMES,
  FILE_NAME_PREFIX,
  styleDictionaryConfig,
});

describe(`All ${DESTINATION_FILE_NAME} tokens`, () => {
  SUPPORTED_THEMES.forEach((theme) => {
    it(`SHOULD be available in ${theme}`, async () => {
      const { default: tokens } = await importTokens(theme, DESTINATION_FILE_NAME);

      expect(findToken(tokens, 'color-text-primary')).to.equal(true);
    });
  });
});
