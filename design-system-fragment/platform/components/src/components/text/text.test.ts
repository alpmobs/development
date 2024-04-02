import {
  expect, fixture, html,
} from '@open-wc/testing';
import type Text from './text';

interface IClassList {
  contains: (className: string) => boolean;
}

describe('<spk-text>', (): void => {
  describe('WHEN provided no parameters', () => {
    it('SHOULD be accessible', async () => {
      const el = await fixture<Text>(html` <spk-text></spk-text> `);

      await expect(el).to.be.accessible();
    });

    it('SHOULD have default HTML attributes set', async () => {
      const el = await fixture<Text>(html` <spk-text></spk-text> `);

      expect(el.type).to.equal('p');
      expect(el.size).to.equal('initial');
      expect(el.color).to.equal('initial');
      expect(el.fontFamily).to.equal('initial');
      expect(el.truncated).to.equal(false);
      expect(el.variant).to.equal('initial');
    });
  });

  describe('WHEN ALL parameters provided', () => {
    it('SHOULD have a TYPE attribute', async () => {
      const el = await fixture<Text>(html` <spk-text type="h1"></spk-text> `);

      expect(el.shadowRoot!.querySelector('h1')).to.exist;
    });

    it('SHOULD have SIZE, COLORS, FONTFAMILY and TRUNCATE attributes', async () => {
      const el = await fixture<Text>(html` <spk-text
        type="h1"
        size="display-2"
        color="secondary"
        fontFamily="primary"
        truncated></spk-text>`);
      const textClassList: IClassList = el.shadowRoot!.querySelector('h1')!.classList;

      expect(textClassList.contains('text--display-2')).to.equal(true);
      expect(textClassList.contains('text--secondary')).to.equal(true);
      expect(textClassList.contains('text--font-primary')).to.equal(true);
      expect(textClassList.contains('text--truncated')).to.equal(true);
    });

    it('SHOULD have a VARIANT attribute', async () => {
      const el = await fixture<Text>(html` <spk-text
        type="h1"
        color="secondary"
        variant="bold"></spk-text>`);
      const textClassList: IClassList = el.shadowRoot!.querySelector('h1')!.classList;

      expect(textClassList.contains('text--variant-bold')).to.equal(true);
    });
  });

  describe('WHEN h1 TYPE attribute is provided', () => {
    it('SHOULD have an `h1` HTML tag', async () => {
      const el = await fixture<Text>(html` <spk-text type="h1"></spk-text> `);
      expect(el.shadowRoot!.querySelector('h1')).to.exist;
    });
  });

  describe('WHEN h2 TYPE attribute is provided', () => {
    it('SHOULD have an `h2` HTML tag', async () => {
      const el = await fixture<Text>(html` <spk-text type="h2"></spk-text> `);
      expect(el.shadowRoot!.querySelector('h2')).to.exist;
    });
  });

  describe('WHEN h3 TYPE attribute is provided', () => {
    it('SHOULD have an `h3` HTML tag', async () => {
      const el = await fixture<Text>(html` <spk-text type="h3"></spk-text> `);
      expect(el.shadowRoot!.querySelector('h3')).to.exist;
    });
  });

  describe('WHEN h4 TYPE attribute is provided', () => {
    it('SHOULD have an `h4` HTML tag', async () => {
      const el = await fixture<Text>(html` <spk-text type="h4"></spk-text> `);
      expect(el.shadowRoot!.querySelector('h4')).to.exist;
    });
  });

  describe('WHEN h5 TYPE attribute is provided', () => {
    it('SHOULD have an `h5` HTML tag', async () => {
      const el = await fixture<Text>(html` <spk-text type="h5"></spk-text> `);
      expect(el.shadowRoot!.querySelector('h5')).to.exist;
    });
  });

  describe('WHEN h6 TYPE attribute is provided', () => {
    it('SHOULD have an `h6` HTML tag', async () => {
      const el = await fixture<Text>(html` <spk-text type="h6"></spk-text> `);
      expect(el.shadowRoot!.querySelector('h6')).to.exist;
    });
  });

  describe('WHEN p TYPE attribute is provided', () => {
    it('SHOULD have a `p` HTML tag', async () => {
      const el = await fixture<Text>(html` <spk-text type="p"></spk-text> `);
      expect(el.shadowRoot!.querySelector('p')).to.exist;
    });
  });

  describe('WHEN span TYPE attribute is provided', () => {
    it('SHOULD have a `span` HTML tag', async () => {
      const el = await fixture<Text>(html` <spk-text type="span"></spk-text> `);
      expect(el.shadowRoot!.querySelector('span')).to.exist;
    });
  });

  describe('WHEN label TYPE attribute is provided', () => {
    it('SHOULD have a `label` HTML tag', async () => {
      const el = await fixture<Text>(html` <spk-text type="label"></spk-text> `);
      expect(el.shadowRoot!.querySelector('label')).to.exist;
    });
  });
});
