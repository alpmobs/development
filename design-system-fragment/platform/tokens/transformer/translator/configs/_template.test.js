//=======================================================================
//
// THIS IS A TEMPLATE ONLY AS A STARTING POINT FOR TOKENS TEST
//
// Copy and paste this file if you are creating a new set of tokens,
//   then delete this comment afterwards
//
//=======================================================================
import { expect } from '@esm-bundle/chai';
import {
  DESTINATION_FILE_NAME, SUPPORTED_THEMES, styleDictionaryConfig, FILE_NAME_PREFIX,
} from './_template.config.js';
import { commonConfigTest, findToken, importTokens } from './_helpers-test.js';

commonConfigTest({
  DESTINATION_FILE_NAME,
  SUPPORTED_THEMES,
  FILE_NAME_PREFIX,
  styleDictionaryConfig,
});

describe(`All ${DESTINATION_FILE_NAME} tokens`, () => {
  SUPPORTED_THEMES.forEach((theme) => {
    describe(`in theme ${theme}`, () => {
      let tokens;

      beforeEach(async () => {
        tokens = await importTokens(theme, DESTINATION_FILE_NAME);
        tokens = tokens.default;
      });

      it('SHOULD be available in common styling', () => {
        // INSERT THE ASSERTIONS HERE
        expect(findToken(tokens, 'color-text-primary')).to.equal(true);
      });
    });
  });
});
