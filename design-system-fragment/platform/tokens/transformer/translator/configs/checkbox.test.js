import { expect } from '@esm-bundle/chai';
import {
  DESTINATION_FILE_NAME, SUPPORTED_THEMES, styleDictionaryConfig, FILE_NAME_PREFIX,
} from './checkbox.config.js';
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
        expect(findToken(tokens, 'checkbox-border-width')).to.equal(true);
        expect(findToken(tokens, 'checkbox-border-style')).to.equal(true);
        expect(findToken(tokens, 'checkbox-border-color-default')).to.equal(true);
        expect(findToken(tokens, 'checkbox-background-color-default')).to.equal(true);

        expect(findToken(tokens, 'checkbox-checkmark-color-default')).to.equal(true);
        expect(findToken(tokens, 'checkbox-checkmark-color-checked-default')).to.equal(true);

        expect(findToken(tokens, 'checkbox-background-color-checked-default')).to.equal(true);
        expect(findToken(tokens, 'checkbox-border-color-checked-default')).to.equal(true);
      });

      it('SHOULD be available in small checkbox', () => {
        expect(findToken(tokens, 'checkbox-border-radius-s')).to.equal(true);
        expect(findToken(tokens, 'checkbox-checkmark-border-width-s')).to.equal(true);
        expect(findToken(tokens, 'checkbox-box-shadow-default-s')).to.equal(true);
        expect(findToken(tokens, 'checkbox-box-shadow-checked-s')).to.equal(true);
      });

      it('SHOULD be available in large checkbox', () => {
        expect(findToken(tokens, 'checkbox-container-border-radius')).to.equal(true);
        expect(findToken(tokens, 'checkbox-container-padding')).to.equal(true);
        expect(findToken(tokens, 'checkbox-border-radius-l')).to.equal(true);
        expect(findToken(tokens, 'checkbox-checkmark-border-width-l')).to.equal(true);

        expect(findToken(tokens, 'checkbox-box-shadow-default-l')).to.equal(true);
        expect(findToken(tokens, 'checkbox-box-shadow-checked-l')).to.equal(true);
      });

      it('SHOULD be available in disabled state', () => {
        expect(findToken(tokens, 'checkbox-border-color-disabled')).to.equal(true);
        expect(findToken(tokens, 'checkbox-background-color-disabled')).to.equal(true);
        expect(findToken(tokens, 'checkbox-checkmark-color-disabled')).to.equal(true);
        expect(findToken(tokens, 'checkbox-background-color-checked-disabled')).to.equal(true);
        expect(findToken(tokens, 'checkbox-border-color-checked-disabled')).to.equal(true);
        expect(findToken(tokens, 'checkbox-checkmark-color-checked-disabled')).to.equal(true);
      });

      it('SHOULD be available when checkbox has error', () => {
        expect(findToken(tokens, 'checkbox-border-color-error')).to.equal(true);
        expect(findToken(tokens, 'checkbox-background-color-error')).to.equal(true);
        expect(findToken(tokens, 'checkbox-checkmark-color-error')).to.equal(true);
      });

      it('SHOULD be available when checkbox is required', () => {
        expect(findToken(tokens, 'checkbox-border-color-error')).to.equal(true);
      });
    });
  });
});
