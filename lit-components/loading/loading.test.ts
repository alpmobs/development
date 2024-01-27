import { expect, fixture, html } from '@open-wc/testing';
import type Loading from './loading';

describe('<spk-loading>', () => {
  describe('WHEN provided no parameters', () => {
    it('SHOULD pass accessibility test', async () => {
      const el = await fixture<Loading>(html` <spk-loading></spk-loading> `);
      await expect(el).to.be.accessible();
    });

    it('SHOULD have default VARIANT, SIZE and COLOR values', async () => {
      const el = await fixture<Loading>(html` <spk-loading></spk-loading> `);

      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('inherit');
      expect(el.color).to.equal('primary');
      expect(el.shadowRoot!.querySelector('span')).to.exist;
    });
  });
  describe('WHEN ALL parameters provided', () => {
    it('SHOULD have VARIANT, SIZE and COLOR attribute', async () => {
      const el = await fixture<Loading>(html` 
        <spk-loading variant="default" size="l" color="secondary"></spk-loading> `);

      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('l');
      expect(el.color).to.equal('secondary');

      expect(el.shadowRoot!.querySelector('span')).to.exist;
    });
  });
});
