import { expect } from '@esm-bundle/chai';
import {
  DESTINATION_FILE_NAME, SUPPORTED_THEMES, styleDictionaryConfig, FILE_NAME_PREFIX,
} from './list.config.js';
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

      it('SHOULD be available in common style', () => {
        expect(findToken(tokens, 'list-font-family')).to.equal(true);
      });

      it('SHOULD be available in primary, secondary and contrast color', () => {
        expect(findToken(tokens, 'list-color-text-primary')).to.equal(true);
        expect(findToken(tokens, 'list-color-text-secondary')).to.equal(true);
        expect(findToken(tokens, 'list-color-text-contrast')).to.equal(true);
      });

      it('SHOULD be available in font weight', () => {
        expect(findToken(tokens, 'list-font-weight-regular')).to.equal(true);
        expect(findToken(tokens, 'list-font-weight-bold')).to.equal(true);
      });

      it('SHOULD be available in all size', () => {
        expect(findToken(tokens, 'list-font-size-3xs')).to.equal(true);
        expect(findToken(tokens, 'list-font-size-2xs')).to.equal(true);
        expect(findToken(tokens, 'list-font-size-xs')).to.equal(true);
        expect(findToken(tokens, 'list-font-size-s')).to.equal(true);
        expect(findToken(tokens, 'list-font-size-m')).to.equal(true);
        expect(findToken(tokens, 'list-font-size-l')).to.equal(true);
        expect(findToken(tokens, 'list-font-size-xl')).to.equal(true);
        expect(findToken(tokens, 'list-font-size-2xl')).to.equal(true);
        expect(findToken(tokens, 'list-font-size-3xl')).to.equal(true);
      });
    });
  });
});
