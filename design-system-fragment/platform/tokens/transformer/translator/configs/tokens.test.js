import { expect } from '@esm-bundle/chai';
import { getBuildPath, THEMES } from './_common.config.js';
import {
  SUPPORTED_THEMES, styleDictionaryConfig,
} from './tokens.config.js';

describe('The styles.config.js', () => {
  it('SHOULD have `SUPPORTED_THEMES`', () => {
    /* eslint-disable no-unused-expressions */
    expect(SUPPORTED_THEMES).to.be.an('array').that.is.not.empty;
    expect(SUPPORTED_THEMES).to.contain.oneOf(Object.values(THEMES));
  });

  describe('styleDictionaryConfig', () => {
    const theme = SUPPORTED_THEMES[0];
    const { source, platforms } = styleDictionaryConfig(SUPPORTED_THEMES[0]);

    it('SHOULD contain `source` of all tokens', () => {
      expect(source[source.length - 1]).to.equal(`./storage/${theme}/*/*.tokens.json`);
    });

    it('SHOULD contain `css` under `platforms`', () => {
      expect(platforms).to.have.own.property('css');
    });

    describe('`platforms.css`', () => {
      const { css } = platforms;

      it('SHOULD contain `transformGroup`', () => {
        expect(css.transformGroup).to.be.equal('css-custom');
      });

      it('SHOULD contain `prefix`', () => {
        expect(css.prefix).to.be.a('string').that.is.not.empty;
      });

      it('SHOULD contain `buildPath`', () => {
        expect(css.buildPath).to.be.a('string').that.is.not.empty;
        expect(css.buildPath).to.be.equal(getBuildPath(theme));
      });

      it('SHOULD have one file config only', () => {
        expect(css.files).to.have.lengthOf(1);
      });

      describe('`platforms.css.files`', () => {
        const { destination, format, filter } = css.files[0];

        it('SHOULD have `destination`', () => {
          expect(destination).to.be.a('string').that.is.not.empty;
          expect(destination).to.equal('_tokens.css');
        });

        it('SHOULD use `css/variables` for `format`', () => {
          expect(format).to.be.equal('css/variables');
        });

        it('SHOULD exclude all brands tokens by using filter `purposeTokenOnly`', () => {
          expect(filter).to.be.equal('purposeTokenOnly');
        });
      });
    });
  });
});
