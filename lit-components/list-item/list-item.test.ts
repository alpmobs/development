import {
  expect, fixture, html,
} from '@open-wc/testing';
import type ListItem from './list-item';

describe('<spk-list-item>', () => {
  describe('WHEN provided no parameters', () => {
    it('SHOULD pass accessibility test', async () => {
      const el = await fixture<ListItem>(html` <spk-list-item></spk-list-item> `);

      expect(el.shadowRoot!.querySelector('li')).to.exist;
      expect(el.shadowRoot!.querySelector('.listItem')).to.exist;
    });
  });

  describe('WHEN <dd> tag is type of list item', () => {
    it('SHOULD have indent attributes', async () => {
      const el = await fixture<ListItem>(html` <spk-list-item indent>List Item is Indented</spk-list-item> `);

      expect(el.indent).to.exist;
    });
  });
});
