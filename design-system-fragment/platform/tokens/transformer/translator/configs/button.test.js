import { expect } from '@esm-bundle/chai';
import {
  DESTINATION_FILE_NAME, SUPPORTED_THEMES, styleDictionaryConfig, FILE_NAME_PREFIX,
} from './button.config.js';
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
        expect(findToken(tokens, 'button-font-family')).to.equal(true);
        expect(findToken(tokens, 'button-font-weight')).to.equal(true);
        expect(findToken(tokens, 'button-text-transform')).to.equal(true);
      });

      it('SHOULD be available in color primary default', () => {
        expect(findToken(tokens, 'button-border-style-primary-default')).to.equal(true);
        expect(findToken(tokens, 'button-border-color-primary-default')).to.equal(true);
        expect(findToken(tokens, 'button-border-width-primary-default')).to.equal(true);
        expect(findToken(tokens, 'button-box-shadow-primary-default')).to.equal(true);
        expect(findToken(tokens, 'button-opacity-primary-default')).to.equal(true);
        expect(findToken(tokens, 'button-background-color-primary-default')).to.equal(true);
        expect(findToken(tokens, 'button-color-text-primary-default')).to.equal(true);
      });

      it('SHOULD be available in color primary hover', () => {
        expect(findToken(tokens, 'button-border-style-primary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-border-color-primary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-border-width-primary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-box-shadow-primary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-opacity-primary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-background-color-primary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-color-text-primary-hover')).to.equal(true);
      });

      it('SHOULD be available in color primary active', () => {
        expect(findToken(tokens, 'button-border-style-primary-active')).to.equal(true);
        expect(findToken(tokens, 'button-border-color-primary-active')).to.equal(true);
        expect(findToken(tokens, 'button-border-width-primary-active')).to.equal(true);
        expect(findToken(tokens, 'button-box-shadow-primary-active')).to.equal(true);
        expect(findToken(tokens, 'button-opacity-primary-active')).to.equal(true);
        expect(findToken(tokens, 'button-background-color-primary-active')).to.equal(true);
        expect(findToken(tokens, 'button-color-text-primary-active')).to.equal(true);
      });

      it('SHOULD be available in color primary disabled', () => {
        expect(findToken(tokens, 'button-border-style-primary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-border-color-primary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-border-width-primary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-box-shadow-primary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-opacity-primary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-background-color-primary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-color-text-primary-disabled')).to.equal(true);
      });

      it('SHOULD be available in color secondary default', () => {
        expect(findToken(tokens, 'button-border-style-secondary-default')).to.equal(true);
        expect(findToken(tokens, 'button-border-color-secondary-default')).to.equal(true);
        expect(findToken(tokens, 'button-border-width-secondary-default')).to.equal(true);
        expect(findToken(tokens, 'button-box-shadow-secondary-default')).to.equal(true);
        expect(findToken(tokens, 'button-opacity-secondary-default')).to.equal(true);
        expect(findToken(tokens, 'button-background-color-secondary-default')).to.equal(true);
        expect(findToken(tokens, 'button-color-text-secondary-default')).to.equal(true);
      });

      it('SHOULD be available in color secondary hover', () => {
        expect(findToken(tokens, 'button-border-style-secondary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-border-color-secondary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-border-width-secondary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-box-shadow-secondary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-opacity-secondary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-background-color-secondary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-color-text-secondary-hover')).to.equal(true);
      });

      it('SHOULD be available in color secondary active', () => {
        expect(findToken(tokens, 'button-border-style-secondary-active')).to.equal(true);
        expect(findToken(tokens, 'button-border-color-secondary-active')).to.equal(true);
        expect(findToken(tokens, 'button-border-width-secondary-active')).to.equal(true);
        expect(findToken(tokens, 'button-box-shadow-secondary-active')).to.equal(true);
        expect(findToken(tokens, 'button-opacity-secondary-active')).to.equal(true);
        expect(findToken(tokens, 'button-background-color-secondary-active')).to.equal(true);
        expect(findToken(tokens, 'button-color-text-secondary-active')).to.equal(true);
      });

      it('SHOULD be available in color secondary disabled', () => {
        expect(findToken(tokens, 'button-border-style-secondary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-border-color-secondary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-border-width-secondary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-box-shadow-secondary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-opacity-secondary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-background-color-secondary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-color-text-secondary-disabled')).to.equal(true);
      });

      it('SHOULD be available in color tertiary default', () => {
        expect(findToken(tokens, 'button-border-style-tertiary-default')).to.equal(true);
        expect(findToken(tokens, 'button-border-color-tertiary-default')).to.equal(true);
        expect(findToken(tokens, 'button-border-width-tertiary-default')).to.equal(true);
        expect(findToken(tokens, 'button-box-shadow-tertiary-default')).to.equal(true);
        expect(findToken(tokens, 'button-opacity-tertiary-default')).to.equal(true);
        expect(findToken(tokens, 'button-background-color-tertiary-default')).to.equal(true);
        expect(findToken(tokens, 'button-color-text-tertiary-default')).to.equal(true);
      });

      it('SHOULD be available in color tertiary hover', () => {
        expect(findToken(tokens, 'button-border-style-tertiary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-border-color-tertiary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-border-width-tertiary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-box-shadow-tertiary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-opacity-tertiary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-background-color-tertiary-hover')).to.equal(true);
        expect(findToken(tokens, 'button-color-text-tertiary-hover')).to.equal(true);
      });

      it('SHOULD be available in color tertiary active', () => {
        expect(findToken(tokens, 'button-border-style-tertiary-active')).to.equal(true);
        expect(findToken(tokens, 'button-border-color-tertiary-active')).to.equal(true);
        expect(findToken(tokens, 'button-border-width-tertiary-active')).to.equal(true);
        expect(findToken(tokens, 'button-box-shadow-tertiary-active')).to.equal(true);
        expect(findToken(tokens, 'button-opacity-tertiary-active')).to.equal(true);
        expect(findToken(tokens, 'button-background-color-tertiary-active')).to.equal(true);
        expect(findToken(tokens, 'button-color-text-tertiary-active')).to.equal(true);
      });

      it('SHOULD be available in color tertiary disabled', () => {
        expect(findToken(tokens, 'button-border-style-tertiary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-border-color-tertiary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-border-width-tertiary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-box-shadow-tertiary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-opacity-tertiary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-background-color-tertiary-disabled')).to.equal(true);
        expect(findToken(tokens, 'button-color-text-tertiary-disabled')).to.equal(true);
      });

      it('SHOULD be available in small size', () => {
        expect(findToken(tokens, 'button-height-s')).to.equal(true);
        expect(findToken(tokens, 'button-padding-x-s')).to.equal(true);
        expect(findToken(tokens, 'button-padding-x-s')).to.equal(true);
        expect(findToken(tokens, 'button-font-size-s')).to.equal(true);
        expect(findToken(tokens, 'button-border-radius-s')).to.equal(true);
        expect(findToken(tokens, 'button-letter-spacing-s')).to.equal(true);
        expect(findToken(tokens, 'button-loading-size-s')).to.equal(true);
      });

      it('SHOULD be available in medium size', () => {
        expect(findToken(tokens, 'button-height-m')).to.equal(true);
        expect(findToken(tokens, 'button-padding-x-m')).to.equal(true);
        expect(findToken(tokens, 'button-padding-x-m')).to.equal(true);
        expect(findToken(tokens, 'button-font-size-m')).to.equal(true);
        expect(findToken(tokens, 'button-border-radius-m')).to.equal(true);
        expect(findToken(tokens, 'button-letter-spacing-m')).to.equal(true);
        expect(findToken(tokens, 'button-loading-size-m')).to.equal(true);
      });

      it('SHOULD be available in large size', () => {
        expect(findToken(tokens, 'button-height-l')).to.equal(true);
        expect(findToken(tokens, 'button-padding-x-l')).to.equal(true);
        expect(findToken(tokens, 'button-padding-x-l')).to.equal(true);
        expect(findToken(tokens, 'button-font-size-l')).to.equal(true);
        expect(findToken(tokens, 'button-border-radius-l')).to.equal(true);
        expect(findToken(tokens, 'button-letter-spacing-l')).to.equal(true);
        expect(findToken(tokens, 'button-loading-size-l')).to.equal(true);
      });
    });
  });
});
