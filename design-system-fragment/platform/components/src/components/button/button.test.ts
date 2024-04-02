import {
  expect,
  fixture,
  html,
  nextFrame,
} from '@open-wc/testing';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import sinon from 'sinon';
import type Button from './button';

interface IClassList {
  contains: (className: string) => boolean;
}

describe('<spk-button>', (): void => {
  describe('WHEN provided no parameters', () => {
    it('SHOULD pass accessibility test', async () => {
      const el = await fixture<Button>(html` <spk-button>Basic Button</spk-button> `);
      await expect(el).to.be.accessible();
    });

    it('SHOULD have set the default values correctly', async () => {
      const el = await fixture<Button>(html` <spk-button>Default Button</spk-button> `);

      expect(el.color).to.equal('primary');
      expect(el.size).to.equal('l');
      expect(el.type).to.equal('button');
      expect(el.shadowRoot!.querySelector('button')).to.exist;
      expect(el.shadowRoot!.querySelector('a')).not.to.exist;
    });
  });

  describe('WHEN "rel" or "target" attribute is present', () => {
    it('SHOULD be an <a> tag if rel attribute is set or present', async () => {
      const el = await fixture<Button>(html` <spk-button rel="nofollow">Default Button</spk-button> `);

      expect(el.shadowRoot!.querySelector('button')).not.to.exist;
      expect(el.shadowRoot!.querySelector('a')).to.exist;
      expect(el.shadowRoot!.querySelector('.button')!.getAttribute('rel')).to.equal('nofollow');
    });

    it('SHOULD be an <a> tag if target attribute is set or present', async () => {
      const el = await fixture<Button>(html` <spk-button target="_self">Default Button</spk-button> `);

      expect(el.shadowRoot!.querySelector('button')).not.to.exist;
      expect(el.shadowRoot!.querySelector('a')).to.exist;
      expect(el.shadowRoot!.querySelector('.button')!.getAttribute('target')).to.equal('_self');
    });
  });

  describe('WHEN "href" is present', () => {
    it('SHOULD be a button link if "href" is set', async () => {
      const el = await fixture<Button>(html` <spk-button href="#">Link Button</spk-button> `);

      expect(el.href).to.equal('#');
      expect(el.shadowRoot!.querySelector('button')).not.to.exist;
      expect(el.shadowRoot!.querySelector('a')).to.exist;
    });
  });

  describe('WHEN using methods', () => {
    it('SHOULD emit spk-focus and spk-blur when the button is focused and blurred', async () => {
      const el = await fixture<Button>(html` <spk-button>Sample Button</spk-button> `);
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
      const el = await fixture<Button>(html` <spk-button>Sample Button</spk-button> `);
      const clickHandler = sinon.spy((e: Event) => e.preventDefault());
      el.addEventListener('click', clickHandler);
      el.click();
      await nextFrame();

      expect(clickHandler).to.have.been.calledOnce;
    });
  });

  describe('WHEN providing ALL attributes', () => {
    it('SHOULD be available in the component and in the shadow element', async () => {
      const el = await fixture<Button>(html` <spk-button 
        size="l" color="secondary" fullwidth title="tooltip"
        name="sample-button" id="sample-button" type="submit">Full Button
      </spk-button> `);

      expect(el.shadowRoot?.querySelector('.button')).to.not.be.null;

      const buttonClassList: IClassList = el.shadowRoot!.querySelector('.button')!.classList;

      expect(el.color).to.equal('secondary');
      expect(el.size).to.equal('l');
      expect(el.fullwidth).to.exist;
      expect(el.title).to.equal('tooltip');
      expect(el.name).to.equal('sample-button');
      expect(el.id).to.equal('sample-button');
      expect(el.type).to.equal('submit');

      expect(buttonClassList.contains('button--secondary')).to.equal(true);
      expect(buttonClassList.contains('button--l')).to.equal(true);
      expect(buttonClassList.contains('button--fullwidth')).to.equal(true);

      expect(el.shadowRoot!.querySelector('.button[title]')).to.exist;
    });
  });

  describe('WHEN the button is loading', () => {
    it('SHOULD be accessible', async () => {
      const el = await fixture<Button>(html` <spk-button loading>Loading Button</spk-button> `);

      await expect(el).to.be.accessible();
    });

    it('SHOULD not trigger a click event', async () => {
      const el = await fixture<Button>(html` <spk-button loading>Loading Button</spk-button> `);
      const handleClick = sinon.spy();

      el.addEventListener('click', handleClick);
      el.click();

      expect(handleClick).not.to.have.been.called;
    });

    it('SHOULD have loading component', async () => {
      const el = await fixture<Button>(html` <spk-button loading>Loading Button</spk-button> `);

      expect(el.shadowRoot!.querySelector('.button__loading')).to.exist;
    });

    it('SHOULD hide button label', async () => {
      const el = await fixture<Button>(html` <spk-button loading>Loading Button</spk-button> `);
      const button = getComputedStyle(el.shadowRoot!.querySelector('.button__label')!);
      const hideLabel = button.getPropertyValue('visibility');

      expect(hideLabel).to.equal('hidden');
    });
  });

  describe('WHEN the button is disabled', () => {
    it('SHOULD have disabled attributes', async () => {
      const el = await fixture<Button>(html` <spk-button disabled>Disabled Button></spk-button> `);
      expect(el.disabled).to.exist;
    });

    it('SHOULD not trigger a click event', async () => {
      const el = await fixture<Button>(html` <spk-button disabled>Disabled Button></spk-button> `);
      const handleClick = sinon.spy();

      el.addEventListener('click', handleClick);
      el.click();

      expect(handleClick).not.to.have.been.called;
    });

    it('SHOULD not add disabled attribute on <a> instead it will add a class "button--disabled"', async () => {
      const el = await fixture<Button>(html` <spk-button href="#" disabled>Button Link</spk-button> `);

      expect(el.shadowRoot!.querySelector('a[disabled]')).not.to.exist;
      expect(el.shadowRoot!.querySelector('.button')!.classList.contains('button--disabled')).to.exist;
    });

    it('SHOULD not bubble up clicks', async () => {
      const button = await fixture<Button>(html` <spk-button disabled>Button Label</spk-button> `);
      const handleClick = sinon.spy();
      button.addEventListener('click', handleClick);
      button.click();

      expect(handleClick).not.to.have.been.called;

      button.shadowRoot!.querySelector('button')!.click();
      expect(handleClick).not.to.have.been.called;

      const buttonLink = await fixture<Button>(html` <spk-button href="some/path" disabled>Button Label</spk-button> `);
      buttonLink.addEventListener('click', handleClick);
      buttonLink.click();

      expect(handleClick).not.to.have.been.called;

      buttonLink.shadowRoot!.querySelector('a')!.click();
      expect(handleClick).not.to.have.been.called;
    });
  });

  describe('WHEN clicking the button and there is a closest form', () => {
    it('SHOULD submit the form', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form id="test-form" action="" method="post">
          <spk-button type="submit">Submit</spk-button>
        </form>
      `);

      const button = form.querySelector<Button>('spk-button')!;
      const handleSubmit = sinon.spy((e: SubmitEvent) => e.preventDefault());

      form.addEventListener('submit', handleSubmit);
      button.click();

      expect(handleSubmit).to.have.been.calledOnce;
    });

    it('SHOULD reset the form', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form id="test-form" action="" method="post">
          <spk-button type="reset" id="test-button">Reset</spk-button>
        </form>
      `);

      const button = form.querySelector<Button>('spk-button')!;
      const handleSubmit = sinon.spy((e: SubmitEvent) => e.preventDefault());
      const handleReset = sinon.spy((e: Event) => e.preventDefault());

      form.addEventListener('reset', handleReset);
      form.addEventListener('submit', handleSubmit);
      button.click();

      expect(handleReset).to.have.been.calledOnce;
      expect(handleSubmit).to.not.have.been.called;
    });

    it('SHOULD submit when the button is outside the form and has a form attribute', async () => {
      const el = await fixture(html`
        <div>
          <form id="outside-form" action="" method="post"></form>
          <spk-button type="submit" form="outside-form">Submit</spk-button>
        </div>
      `);
      const form = el.querySelector<HTMLFormElement>('form')!;
      const button = el.querySelector<Button>('spk-button')!;
      const handleSubmit = sinon.spy((event: SubmitEvent) => event.preventDefault());

      form.addEventListener('submit', handleSubmit);
      button.click();

      expect(handleSubmit).to.have.been.calledOnce;
    });

    // eslint-disable-next-line max-len
    it('SHOULD override form attributes when formaction, formmethod, formnovalidate, and formtarget are used inside a form', async () => {
      const form = await fixture(html`
        <form id="a" action="foo" method="post" target="_self">
          <spk-button type="submit" form="a" formaction="bar" formmethod="get" formtarget="_blank" formnovalidate>
            Submit
          </spk-button>
        </form>
      `);
      const button = form.querySelector<Button>('spk-button')!;
      let submitter!: HTMLButtonElement;
      const handleSubmit = sinon.spy((event: SubmitEvent) => {
        submitter = event.submitter as HTMLButtonElement;
        event.preventDefault();
      });

      form.addEventListener('submit', handleSubmit);
      button.click();

      expect(handleSubmit).to.have.been.calledOnce;
      expect(submitter.formAction.endsWith('/bar')).to.be.true;
      expect(submitter.formMethod).to.equal('get');
      expect(submitter.formTarget).to.equal('_blank');
      expect(submitter.formNoValidate).to.be.true;
    });
  });

  runFormControlBaseTests({
    tagName: 'spk-button',
    variantName: 'type="button"',

    init: (control: Button) => {
      control.type = 'button';
    }
  });

  runFormControlBaseTests({
    tagName: 'spk-button',
    variantName: 'type="submit"',

    init: (control: Button) => {
      control.type = 'submit';
    }
  });

  runFormControlBaseTests({
    tagName: 'spk-button',
    variantName: 'href="xyz"',

    init: (control: Button) => {
      control.href = 'some-url';
    }
  });
});
