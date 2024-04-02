import {
  expect, fixture, html,
} from '@open-wc/testing';
import type Icon from './icon';

interface IClassList {
  contains: (className: string) => boolean;
}

describe('<spk-icon>', (): void => {
  describe('WHEN provided no parameters', () => {
    it('SHOULD be accessible', async () => {
      const el = await fixture<Icon>(html` <spk-icon></spk-icon> `);

      await expect(el).to.be.accessible();
    });

    it('SHOULD have default SIZE and COLOR values', async () => {
      const el = await fixture<Icon>(html` <spk-icon></spk-icon> `);

      expect(el.size).to.equal('inherit');
      expect(el.color).to.equal('primary');
      expect(el.shadowRoot!.querySelector('i')).to.exist;
    });

    it('SHOULD inherit its parent container font size', async () => {
      const el = await fixture(html` <span style="font-size:16px;"><spk-icon></spk-icon></span> `);
      const icon: CSSStyleDeclaration = getComputedStyle(el.querySelector('spk-icon')!.icon);
      const inheritedFontSize = icon.getPropertyValue('font-size');

      expect(inheritedFontSize).to.equal('16px');
    });
  });

  describe('WHEN ALL parameters provided', () => {
    it('SHOULD have NAME attribute', async () => {
      const el = await fixture<Icon>(html` <spk-icon name="home" size="l" color="secondary"></spk-icon> `);

      expect(el.shadowRoot!.querySelector('i')).to.exist;
      expect(el.shadowRoot!.querySelector('i[name="home"]')).to.exist;
    });

    it('SHOULD be equal to the set SIZE and COLOR values including classes', async () => {
      const el = await fixture<Icon>(html` <spk-icon name="home" size="l" color="secondary"></spk-icon> `);
      const iconClassList: IClassList = el.shadowRoot!.querySelector('i')!.classList;

      expect(el.name).to.equal('home');
      expect(el.size).to.equal('l');
      expect(el.color).to.equal('secondary');

      expect(iconClassList.contains('icon')).to.equal(true);
      expect(iconClassList.contains('icon--l')).to.equal(true);
      expect(iconClassList.contains('icon--secondary')).to.equal(true);
    });
  });

  describe('WHEN is ready to use for loading component', () => {
    it('SHOULD have rotate image with default COLOR value', async () => {
      const el = await fixture<Icon>(html` <spk-icon name="loading"></spk-icon> `);

      expect(el.shadowRoot?.querySelector('i')).to.not.be.null;
      expect(el.name).to.equal('loading');
      expect(el.color).to.equal('primary');
      expect(el.shadowRoot!.querySelector('i[name="loading"]')).to.exist;
    });
  });
});
