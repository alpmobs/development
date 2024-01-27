import {
  expect, fixture, html,
} from '@open-wc/testing';
import type Radio from './radio';

interface IClassList {
  contains: (className: string) => boolean;
}

describe('<spk-radio>', (): void => {
  describe('WHEN provided no parameters', () => {
    it('SHOULD be accessible', async () => {
      const el = await fixture<Radio>(html` <spk-radio>Sample Radio Item</spk-radio> `);

      await expect(el).to.be.accessible();
    });

    it('SHOULD have default HTML structure', async () => {
      const el = await fixture<Radio>(html` <spk-radio>Sample radio item</spk-radio> `);

      expect(el.value).to.be.undefined;
      expect(el.id).to.be.undefined;
      expect(el.name).to.be.undefined;
      expect(el.size).to.equal('s');
      expect(el.disabled).to.be.false;
    });
  });

  describe('WHEN ALL parameters provided', () => {
    it('SHOULD have a NAME attribute', async () => {
      const name = 'Sample nalue';
      const el = await fixture<Radio>(html` <spk-radio name="${name}">Sample radio item</spk-radio> `);

      expect(el.getAttribute('name')).to.equal(name);
    });

    it('SHOULD have a VALUE attribute', async () => {
      const value = 'Sample value';
      const el = await fixture<Radio>(html` <spk-radio value="${value}">Sample radio item</spk-radio> `);

      expect(el.getAttribute('value')).to.equal(value);
    });

    it('SHOULD have SIZE attributes', async () => {
      const el = await fixture<Radio>(html` <spk-radio size="l">Sample radio item</spk-radio>`);
      const radioClass: IClassList = el.shadowRoot!.querySelector('.radio')!.classList;

      expect(radioClass.contains('radio--l')).to.equal(true);
    });

    it('SHOULD have a LABEL attribute', async () => {
      const label = 'Sample label';
      const el = await fixture<Radio>(html` <spk-radio label="${label}">Sample radio item</spk-radio> `);

      expect(el.getAttribute('label')).to.equal(label);
    });

    it('SHOULD have DISABLED attributes', async () => {
      const el = await fixture<Radio>(html`
          <spk-radio disabled>Sample radio item</spk-radio>`);
      const radioClassList: IClassList = el.shadowRoot!.querySelector('.radio')!.classList;

      expect(radioClassList.contains('radio--disabled')).to.equal(true);
    });
  });
});
