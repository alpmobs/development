import { expect } from '@esm-bundle/chai';
import {
  DESTINATION_FILE_NAME, SUPPORTED_THEMES, styleDictionaryConfig, FILE_NAME_PREFIX,
} from './toggle.config.js';
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

      it('SHOULD be available in label', () => {
        expect(findToken(tokens, 'toggle-label-font-family')).to.equal(true);
        expect(findToken(tokens, 'toggle-label-font-size')).to.equal(true);
        expect(findToken(tokens, 'toggle-label-font-weight')).to.equal(true);
        expect(findToken(tokens, 'toggle-label-color-default')).to.equal(true);
      });

      it('SHOULD be available in small size', () => {
        expect(findToken(tokens, 'toggle-size-s')).to.equal(true);
      });

      it('SHOULD be available in large size', () => {
        expect(findToken(tokens, 'toggle-container-border-style')).to.equal(true);
        expect(findToken(tokens, 'toggle-container-border-width')).to.equal(true);
        expect(findToken(tokens, 'toggle-container-border-color-default')).to.equal(true);
        expect(findToken(tokens, 'toggle-container-background-color-default')).to.equal(true);
        expect(findToken(tokens, 'toggle-size-l')).to.equal(true);
      });

      it('SHOULD be available in disabled state', () => {
        expect(findToken(tokens, 'toggle-opacity-disabled')).to.equal(true);
        expect(findToken(tokens, 'toggle-container-border-color-disabled')).to.equal(true);
        expect(findToken(tokens, 'toggle-container-background-color-disabled')).to.equal(true);
      });

      it('SHOULD be available in label when in error state', () => {
        expect(findToken(tokens, 'toggle-label-color-default')).to.equal(true);
      });
    });
  });
});
