import { expect } from '@esm-bundle/chai';
import {
  DESTINATION_FILE_NAME, SUPPORTED_THEMES, styleDictionaryConfig, FILE_NAME_PREFIX,
} from './icon.config.js';
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

      it('SHOULD be available in color primary default', () => {
        expect(findToken(tokens, 'icon-color-primary')).to.equal(true);
      });

      it('SHOULD be available in color secondary default', () => {
        expect(findToken(tokens, 'icon-color-secondary')).to.equal(true);
      });

      it('SHOULD be available in small size', () => {
        expect(findToken(tokens, 'icon-size-s')).to.equal(true);
      });

      it('SHOULD be available in medium size', () => {
        expect(findToken(tokens, 'icon-size-m')).to.equal(true);
      });

      it('SHOULD be available in large size', () => {
        expect(findToken(tokens, 'icon-size-l')).to.equal(true);
      });

      it('SHOULD be available in extra large size', () => {
        expect(findToken(tokens, 'icon-size-xl')).to.equal(true);
      });

      it('SHOULD be available for rotate svg icon', () => {
        expect(findToken(tokens, 'icon-svg-rotate')).to.equal(true);
      });
    });
  });
});
