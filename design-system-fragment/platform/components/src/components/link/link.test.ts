import {
  expect, fixture, html, nextFrame,
} from '@open-wc/testing';
import sinon from 'sinon';
import type Link from './link';

describe('<spk-link>', (): void => {
  describe('WHEN provided no parameters', () => {
    it('SHOULD have set the default values correctly', async () => {
      const el = await fixture<Link>(html` <spk-link>Sample Link</spk-link> `);

      expect(el.href).to.equal(undefined);
      expect(el.rel).to.equal('');
      expect(el.color).to.equal('primary');
      expect(el.size).to.equal('inherit');
    });
  });

  describe('WHEN invalid parameter is provided', () => {
    it('SHOULD have no classes for `color` and `size`', async () => {
      const el = await fixture<Link>(html` <spk-link color="invalid" size="invalid">Sample Link</spk-link> `);

      expect(el.shadowRoot!.querySelector('.link')!.classList.length).to.equal(1);
    });
  });

  describe('WHEN attribute is not set', () => {
    let link:Link | null;

    beforeEach(async () => {
      const el = await fixture<Link>(html` <spk-link color="primary" size="m">Sample Link</spk-link> `);
      link = el.shadowRoot!.querySelector('.link');
    });

    it('SHOULD not have `href` attribute in `<a>` shadow dom', () => {
      expect(link!.getAttribute('href')).to.null;
    });

    it('SHOULD not have `target` attribute in `<a>` shadow dom', () => {
      expect(link!.getAttribute('target')).to.null;
    });

    it('SHOULD not have `rel` attribute in `<a>` shadow dom', () => {
      expect(link!.getAttribute('rel')).to.null;
    });
  });

  describe('WHEN attribute is supplied', () => {
    it('SHOULD be have be equal to the `href`, `rel` and `target` host attributes', async () => {
      const url = '#test-url-anchor';
      const rel = 'nofollow';
      const target = '_blank';

      const el = await fixture<Link>(html` 
          <spk-link href="${url}" rel="${rel}" target="${target}">Sample Link</spk-link> 
      `);

      const link: Link | null = el.shadowRoot!.querySelector('.link');

      expect(link!.getAttribute('href')).to.equal(url);
      expect(link!.getAttribute('rel')).to.equal(rel);
      expect(link!.getAttribute('target')).to.equal(target);
    });
  });

  describe('WHEN using methods', () => {
    it('SHOULD emit spk-focus and spk-blur when the link is focused and blurred', async () => {
      const el = await fixture<Link>(html` <spk-link>Sample Link</spk-link> `);
      const focusHandler = sinon.spy();
      const blurHandler = sinon.spy();

      el.addEventListener('spk-focus', focusHandler);
      el.addEventListener('spk-blur', blurHandler);

      el.focus();
      await nextFrame();

      el.blur();
      await nextFrame();

      expect(focusHandler).to.have.been.calledOnce;
      expect(blurHandler).to.have.been.calledOnce;
    });

    it('SHOULD emit a click event when calling click()', async () => {
      const el = await fixture<Link>(html` <spk-link>Sample Link</spk-link> `);
      const clickHandler = sinon.spy((e: Event) => {
        e.preventDefault();
      });

      el.addEventListener('click', clickHandler);
      el.click();
      await nextFrame();

      expect(clickHandler).to.have.been.calledOnce;
    });
  });
});
