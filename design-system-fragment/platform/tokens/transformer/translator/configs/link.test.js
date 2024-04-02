import { expect } from '@esm-bundle/chai';
import {
  DESTINATION_FILE_NAME, SUPPORTED_THEMES, styleDictionaryConfig, FILE_NAME_PREFIX,
} from './link.config.js';
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
        expect(findToken(tokens, 'link-font-family')).to.equal(true);
      });

      it('SHOULD be available in color primary', () => {
        expect(findToken(tokens, 'link-color-text-primary-default')).to.equal(true);
        expect(findToken(tokens, 'link-color-text-primary-hover')).to.equal(true);
        expect(findToken(tokens, 'link-color-text-primary-active')).to.equal(true);
        expect(findToken(tokens, 'link-color-text-primary-visited')).to.equal(true);
      });

      it('SHOULD be available in color secondary', () => {
        expect(findToken(tokens, 'link-color-text-secondary-default')).to.equal(true);
        expect(findToken(tokens, 'link-color-text-secondary-hover')).to.equal(true);
        expect(findToken(tokens, 'link-color-text-secondary-active')).to.equal(true);
        expect(findToken(tokens, 'link-color-text-secondary-visited')).to.equal(true);
      });

      it('SHOULD be available in all size', () => {
        expect(findToken(tokens, 'link-font-size-3xs')).to.equal(true);
        expect(findToken(tokens, 'link-font-size-2xs')).to.equal(true);
        expect(findToken(tokens, 'link-font-size-xs')).to.equal(true);
        expect(findToken(tokens, 'link-font-size-s')).to.equal(true);
        expect(findToken(tokens, 'link-font-size-m')).to.equal(true);
        expect(findToken(tokens, 'link-font-size-l')).to.equal(true);
        expect(findToken(tokens, 'link-font-size-xl')).to.equal(true);
        expect(findToken(tokens, 'link-font-size-2xl')).to.equal(true);
        expect(findToken(tokens, 'link-font-size-3xl')).to.equal(true);
      });
    });
  });
});
