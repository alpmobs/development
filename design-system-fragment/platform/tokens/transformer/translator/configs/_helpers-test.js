//=======================================================================
//
// Put all the common tests helpers here.
// This is read by all the config *.test.js files
//
//=======================================================================
import { expect } from '@esm-bundle/chai';
import { getBuildPath, THEMES, TOKEN_PREFIX } from './_common.config.js';

export const importTokens = (theme, tokenFileName) => import(`../../../${getBuildPath(theme)}${tokenFileName}`);
export const findToken = (tokens, tokenName) => Object.hasOwn(tokens, `${TOKEN_PREFIX}-${tokenName}`);

export const commonConfigTest = ({
  DESTINATION_FILE_NAME, SUPPORTED_THEMES, FILE_NAME_PREFIX, styleDictionaryConfig,
}) => {
  describe(`The ${FILE_NAME_PREFIX}.config.js`, () => {
    it('SHOULD have `SUPPORTED_THEMES`', () => {
      /* eslint-disable no-unused-expressions */
      expect(SUPPORTED_THEMES).to.be.an('array').that.is.not.empty;
      expect(SUPPORTED_THEMES).to.contain.oneOf(Object.values(THEMES));
    });

    it('SHOULD have `FILE_NAME_PREFIX`', () => {
      /* eslint-disable no-unused-expressions */
      expect(FILE_NAME_PREFIX).to.be.a('string').that.is.not.empty;
    });

    it('SHOULD have `DESTINATION_FILE_NAME`', () => {
      /* eslint-disable no-unused-expressions */
      expect(DESTINATION_FILE_NAME).to.be.a('string').that.is.not.empty;
    });

    describe('styleDictionaryConfig', () => {
      const theme = SUPPORTED_THEMES[0];
      const { source, platforms } = styleDictionaryConfig(SUPPORTED_THEMES[0]);

      it('SHOULD contain `source` that declares the token location at the last index', () => {
        expect(source[source.length - 1]).to.equal(`./storage/${theme}/purpose/${FILE_NAME_PREFIX}.tokens.json`);
      });

      it('SHOULD contain `js` under `platforms`', () => {
        expect(platforms).to.have.own.property('js');
      });

      describe('`platforms.js`', () => {
        const { js } = platforms;

        it('SHOULD contain `transformGroup`', () => {
          expect(js.transformGroup).to.be.equal('js');
        });

        it('SHOULD contain `prefix`', () => {
          expect(js.prefix).to.be.a('string').that.is.not.empty;
        });

        it('SHOULD contain `buildPath`', () => {
          expect(js.buildPath).to.be.a('string').that.is.not.empty;
          expect(js.buildPath).to.be.equal(getBuildPath(theme));
        });

        it('SHOULD have one file config only', () => {
          expect(js.files).to.have.lengthOf(1);
        });

        describe('`platforms.js.files`', () => {
          const { destination, format, filter } = js.files[0];

          it('SHOULD have `destination`', () => {
            expect(destination).to.be.a('string').that.is.not.empty;
          });

          it('SHOULD use `javascript/es-module-flat` for `format`', () => {
            expect(format).to.be.equal('javascript/es-module-flat');
          });

          it('SHOULD exclude all brands tokens by using filter `purposeTokenOnly`', () => {
            expect(filter).to.be.equal('purposeTokenOnly');
          });
        });
      });
    });
  });
};
