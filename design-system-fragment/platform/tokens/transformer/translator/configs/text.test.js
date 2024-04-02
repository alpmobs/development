import { expect } from '@esm-bundle/chai';
import {
  DESTINATION_FILE_NAME, SUPPORTED_THEMES, styleDictionaryConfig, FILE_NAME_PREFIX,
} from './text.config.js';
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

      it('SHOULD be available for H1 font size default', () => {
        expect(findToken(tokens, 'text-type-size-heading-1')).to.equal(true);
      });

      it('SHOULD be available for H2 font size default', () => {
        expect(findToken(tokens, 'text-type-size-heading-2')).to.equal(true);
      });

      it('SHOULD be available for H3 font size default', () => {
        expect(findToken(tokens, 'text-type-size-heading-3')).to.equal(true);
      });

      it('SHOULD be available for H4 font size default', () => {
        expect(findToken(tokens, 'text-type-size-heading-4')).to.equal(true);
      });

      it('SHOULD be available for H5 font size default', () => {
        expect(findToken(tokens, 'text-type-size-heading-5')).to.equal(true);
      });

      it('SHOULD be available for H6 font size default', () => {
        expect(findToken(tokens, 'text-type-size-heading-6')).to.equal(true);
      });

      it('SHOULD be available for paragraph font size default', () => {
        expect(findToken(tokens, 'text-type-size-paragraph')).to.equal(true);
      });

      it('SHOULD be available for span font size default', () => {
        expect(findToken(tokens, 'text-type-size-span')).to.equal(true);
      });

      it('SHOULD be available for label font size default', () => {
        expect(findToken(tokens, 'text-type-size-label')).to.equal(true);
      });

      it('SHOULD be available in Primary font family', () => {
        expect(findToken(tokens, 'text-font-family-primary')).to.equal(true);
      });

      it('SHOULD be available in Secondary font family', () => {
        expect(findToken(tokens, 'text-font-family-secondary')).to.equal(true);
      });

      it('SHOULD be available in regular font weight', () => {
        expect(findToken(tokens, 'text-font-weight-regular')).to.equal(true);
      });

      it('SHOULD be available in bold font weight', () => {
        expect(findToken(tokens, 'text-font-weight-bold')).to.equal(true);
      });

      it('SHOULD be available in color primary', () => {
        expect(findToken(tokens, 'text-color-primary')).to.equal(true);
      });

      it('SHOULD be available in color secondary', () => {
        expect(findToken(tokens, 'text-color-secondary')).to.equal(true);
      });

      it('SHOULD be available in color neutral', () => {
        expect(findToken(tokens, 'text-color-neutral')).to.equal(true);
      });

      it('SHOULD be available in color success', () => {
        expect(findToken(tokens, 'text-color-success')).to.equal(true);
      });

      it('SHOULD be available in color warning', () => {
        expect(findToken(tokens, 'text-color-warning')).to.equal(true);
      });

      it('SHOULD be available in color error', () => {
        expect(findToken(tokens, 'text-color-error')).to.equal(true);
      });
    });
  });
});
