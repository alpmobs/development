import {
  expect, fixture, html,
} from '@open-wc/testing';
import type RadioGroup from './radio-group';

interface IClassList {
  contains: (className: string) => boolean;
}

describe('<spk-radio-group>', (): void => {
  describe('WHEN provided no parameters', () => {
    it('SHOULD be accessible', async () => {
      const el = await fixture<RadioGroup>(html` <spk-radio-group>Sample Radio Group</spk-radio-group> `);

      await expect(el).to.be.accessible();
    });

    it('SHOULD have default HTML structure', async () => {
      const el = await fixture<RadioGroup>(html` <spk-radio-group>Sample Radio Group</spk-radio-group> `);

      expect(el.label).to.equal('');
      expect(el.value).to.equal('');
      expect(el.name).to.equal('option');
      expect(el.size).to.equal('s');
      expect(el.required).to.be.false;
    });
  });

  describe('WHEN ALL parameters provided', () => {
    it('SHOULD have a LABEL attribute', async () => {
      const label = 'Sample label';
      const el = await fixture<RadioGroup>(html` 
        <spk-radio-group label="${label}">Sample Radio Group</spk-radio-group> `);
      const radiogroupClass: IClassList = el.shadowRoot!.querySelector('.radio-group')!.classList;

      expect(radiogroupClass.contains('radio-group--has-label')).to.equal(true);
    });

    it('SHOULD have a NAME attribute', async () => {
      const name = 'option';
      const el = await fixture<RadioGroup>(html` 
        <spk-radio-group name="${name}">Sample Radio Group</spk-radio-group> `);

      expect(el.getAttribute('name')).to.equal(name);
    });

    it('SHOULD have a VALUE attribute', async () => {
      const value = 'Sample value';
      const el = await fixture<RadioGroup>(html` 
        <spk-radio-group value="${value}">Sample Radio Group</spk-radio-group> `);

      expect(el.getAttribute('value')).to.equal(value);
    });

    it('SHOULD have REQUIRED attributes', async () => {
      const el = await fixture<RadioGroup>(html`
        <spk-radio-group required>Sample Radio Group</spk-radio-group>`);
      const radiogroupClassList: IClassList = el.shadowRoot!.querySelector('.radio-group')!.classList;

      expect(radiogroupClassList.contains('radio-group--required')).to.equal(true);
    });
  });
});
