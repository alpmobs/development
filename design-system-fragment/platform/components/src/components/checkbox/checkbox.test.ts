import {
  expect, fixture, html,
} from '@open-wc/testing';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import type Checkbox from './checkbox';

  interface IClassList {
    contains: (className: string) => boolean;
  }

describe('<spk-checkbox>', (): void => {
  describe('WHEN provided no parameters', () => {
    it('SHOULD be accessible', async () => {
      const el = await fixture<Checkbox>(html` <spk-checkbox>Sample checkbox</spk-checkbox> `);

      await expect(el).to.be.accessible();
    });

    it('SHOULD have default HTML structure', async () => {
      const el = await fixture<Checkbox>(html` <spk-checkbox>Sample checkbox</spk-checkbox> `);

      expect(el.name).to.equal('');
      expect(el.value).to.be.undefined;
      expect(el.title).to.equal('');
      expect(el.size).to.equal('s');
      expect(el.checked).to.be.false;
      expect(el.disabled).to.be.false;
      expect(el.required).to.be.false;
      expect(el.indeterminate).to.be.false;
      expect(el.defaultChecked).to.be.false;
    });
  });

  describe('WHEN ALL parameters provided', () => {
    it('SHOULD have a NAME attribute', async () => {
      const name = 'sampleName';
      const el = await fixture<Checkbox>(html` <spk-checkbox name="${name}">Sample checkbox</spk-checkbox> `);

      expect(el.getAttribute('name')).to.equal(name);
    });

    it('SHOULD have a VALUE attribute', async () => {
      const value = 'sampleValue';
      const el = await fixture<Checkbox>(html` <spk-checkbox value="${value}">Sample checkbox</spk-checkbox> `);

      expect(el.getAttribute('value')).to.equal(value);
    });

    it('SHOULD have SIZE attributes', async () => {
      const el = await fixture<Checkbox>(html` <spk-checkbox size="l">Sample checkbox</spk-checkbox>`);
      const checkboxClass: IClassList = el.shadowRoot!.querySelector('.checkbox--item')!.classList;

      expect(checkboxClass.contains('checkbox--l')).to.equal(true);
    });

    it('SHOULD have CHECKED, DISABLED and REQUIRED attributes', async () => {
      const el = await fixture<Checkbox>(html`
      <spk-checkbox checked disabled required>Sample checkbox</spk-checkbox>`);
      const checkboxClassList: IClassList = el.shadowRoot!.querySelector('.checkbox--item')!.classList;

      expect(el.shadowRoot!.querySelector('.checkbox__input:checked')).to.exist;
      expect(checkboxClassList.contains('checkbox--disabled')).to.equal(true);
      expect(checkboxClassList.contains('checkbox--required')).to.equal(true);
    });
  });

  runFormControlBaseTests('spk-checkbox');
});
