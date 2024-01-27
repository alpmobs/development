import {
  expect, fixture, html,
} from '@open-wc/testing';
import type List from './list';

interface IClassList {
  contains: (className: string) => boolean;
}

describe('<spk-list>', () => {
  describe('WHEN provided no parameters', () => {
    it('SHOULD pass accessibility test', async () => {
      const el = await fixture<List>(html` <spk-list><li>This is list</li></spk-list> `);
      await expect(el).to.be.accessible();
    });

    it('SHOULD have default TYPE and SIZE values', async () => {
      const el = await fixture<List>(html` <spk-list></spk-list> `);

      expect(el.size).to.equal('inherit');
      expect(el.type).to.equal('ul');
      expect(el.shadowRoot!.querySelector('ul')).to.exist;
    });
  });

  describe('WHEN ALL parameters provided', () => {
    it('SHOULD be equal to the set TYPE, SIZE, COLOR, MARKER and VARIANT values including classes', async () => {
      const el = await fixture<List>(html` 
        <spk-list type="ul" size="l" color="primary" marker="disc" variant="bold-underline"></spk-list> `);
      const iconClassList: IClassList = el.shadowRoot!.querySelector('ul')!.classList;

      expect(el.type).to.equal('ul');
      expect(el.size).to.equal('l');
      expect(el.color).to.equal('primary');
      expect(el.marker).to.equal('disc');
      expect(el.variant).to.equal('bold-underline');

      expect(iconClassList.contains('list')).to.equal(true);
      expect(iconClassList.contains('list--l')).to.equal(true);
      expect(iconClassList.contains('list--primary')).to.equal(true);
      expect(iconClassList.contains('list--type-disc')).to.equal(true);
      expect(iconClassList.contains('list--variant-bold-underline')).to.equal(true);
    });
  });

  describe('WHEN list type is set', () => {
    it('SHOULD be a <ul> tag when unordered list type is set', async () => {
      const el = await fixture<List>(html` <spk-list type="ul">List Items</spk-list> `);

      expect(el.shadowRoot!.querySelector('ul')).to.exist;
    });

    it('SHOULD be a <ol> tag when ordered list type is set', async () => {
      const el = await fixture<List>(html` <spk-list type="ol">List Items</spk-list> `);

      expect(el.shadowRoot!.querySelector('ol')).to.exist;
    });

    it('SHOULD be a <dl> tag when definition list type is set', async () => {
      const el = await fixture<List>(html` <spk-list type="dl">List Items</spk-list> `);

      expect(el.shadowRoot!.querySelector('dl')).to.exist;
    });
  });
});
