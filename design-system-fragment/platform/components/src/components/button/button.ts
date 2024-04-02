import '../loading/loading.js';
import { classMap } from 'lit/directives/class-map.js';
import {
  customElement, property, query, state,
} from 'lit/decorators.js';
import { FormControlController, validValidityState } from '../../internal/form.js';
import { html, literal } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import SparkElement from '../../internal/spark-element.js';
import styles from './button.styles';
import type { CSSResultGroup, TemplateResult } from 'lit';
import type { SparkFormControl } from '../../internal/spark-element.js';

@customElement('spk-button')
export default class Button extends SparkElement implements SparkFormControl {
  static styles: CSSResultGroup = styles;

  private readonly formControlController = new FormControlController(this, {
    form: (input) => {
      // Buttons support a form attribute that points to an arbitrary form, so if this attribute is set we need to query
      // the form from the same root using its id
      if (input.hasAttribute('form')) {
        const doc = input.getRootNode() as Document | ShadowRoot;
        const formId = input.getAttribute('form')!;
        return doc.getElementById(formId) as HTMLFormElement;
      }

      // Fall back to the closest containing form
      return input.closest('form');
    },
    assumeInteractionOn: ['click']
  });

  @query('.button') container: HTMLElement;

  @query('.button') button: HTMLButtonElement | HTMLLinkElement;

  @state() private hasFocus = false;

  @state() invalid = false;

  /** Used to override the form owner's `action` attribute. */
  @property({ attribute: 'formaction' }) formAction: string;

  /** Used to override the form owner's `enctype` attribute.  */
  @property({ attribute: 'formenctype' })
    formEnctype: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

  /** Used to override the form owner's `method` attribute.  */
  @property({ attribute: 'formmethod' }) formMethod: 'post' | 'get';

  /** Used to override the form owner's `novalidate` attribute. */
  @property({ attribute: 'formnovalidate', type: Boolean }) formNoValidate: boolean;

  /** Used to override the form owner's `target` attribute. */
  @property({ attribute: 'formtarget' }) formTarget: '_self' | '_blank' | '_parent' | '_top' | string;

  /** Tooltip of the Button component */
  @property() title = ''; // make reactive to pass through

  /** Converts the shadow component to <a> element if href is set */
  @property() href = '';

  /**
   * Converts the shadow component to <a> element if rel is set
   *
   * Possible values: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel
   */
  @property() rel = '';

  /**
   * Name of the component, this is usually set if you to use
   * the component inside a Form element
   */
  @property() name = '';

  /**
   * Value of the component, this is usually set if you to use
   * the component inside a Form element
   */
  @property() value = '';

  /** Sets the type of button */
  @property({ reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';

  /** Tells the browser where to open the link. */
  @property() target?: '_blank' | '_self' | '_top' | '_parent';

  /** The component's colors */
  @property({ reflect: true }) color: 'primary' | 'secondary' | 'tertiary' = 'primary';

  /** Sets the size of the Button component */
  @property({ reflect: true }) size: 's' | 'm' | 'l' = 'l';

  /** Sets the availability state of the Button */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Sets the loading state of the Button */
  @property({ type: Boolean, reflect: true }) loading = false;

  /**  Make the button occupy the whole space of the container */
  @property({ type: Boolean }) fullwidth = false;

  connectedCallback() {
    super.connectedCallback();
    this.handleHostClick = this.handleHostClick.bind(this);
    this.addEventListener('click', this.handleHostClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleHostClick);
  }

  private handleHostClick(event: MouseEvent) {
    // Prevent the click event from being emitted when the button is disabled or loading
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  private isButton() {
    return !this.isLink();
  }

  private isLink(): boolean {
    return !!this.href || !!this.rel || !!this.target;
  }

  /** Gets the validity state object */
  get validity() {
    if (this.isButton()) {
      return (this.button as HTMLButtonElement).validity;
    }

    return validValidityState;
  }

  /** Gets the validation message */
  get validationMessage() {
    if (this.isButton()) {
      return (this.button as HTMLButtonElement).validationMessage;
    }

    return '';
  }

  firstUpdated() {
    if (this.isButton()) {
      this.formControlController.updateValidity();
    }
  }

  /** Gets the associated form, if one exists. */
  getForm(): HTMLFormElement | null {
    return this.formControlController.getForm();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    if (this.isButton()) {
      return (this.button as HTMLButtonElement).reportValidity();
    }

    return true;
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message: string) {
    if (this.isButton()) {
      (this.button as HTMLButtonElement).setCustomValidity(message);
      this.formControlController.updateValidity();
    }
  }

  private handleClick() {
    if (this.disabled || this.loading) {
      return;
    }

    if (this.type === 'submit') {
      this.formControlController.submit(this);
    }

    if (this.type === 'reset') {
      this.formControlController.reset(this);
    }
  }

  private handleInvalid(event: Event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }

  private handleBlur() {
    this.hasFocus = false;
    this.emit('spk-blur');
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('spk-focus');
  }

  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }

  /** Sets focus on the button. */
  focus(options?: FocusOptions) {
    this.button.focus(options);
  }

  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }

  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    if (this.isButton()) {
      return (this.button as HTMLButtonElement).checkValidity();
    }

    return true;
  }

  public render(): TemplateResult {
    const isLink = this.isLink();
    const tag = isLink ? literal`a` : literal`button`;

    /* eslint-disable lit/no-invalid-html */
    /* eslint-disable lit/binding-positions */
    return html`
      <${tag}
        class=${classMap({
        button: true,
        'button--primary': this.color === 'primary',
        'button--secondary': this.color === 'secondary',
        'button--tertiary': this.color === 'tertiary',
        'button--s': this.size === 's',
        'button--m': this.size === 'm',
        'button--l': this.size === 'l',
        'button--fullwidth': this.fullwidth,
        'button--disabled': isLink && this.disabled,
        'button--focused': this.hasFocus,
          'button--loading': this.loading,
        })}
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        href=${ifDefined(isLink ? this.href : undefined)}
        rel=${ifDefined(isLink ? this.rel : undefined)}
        target=${ifDefined(isLink ? this.target : undefined)}
        type=${ifDefined(isLink ? undefined : this.type)}
        title=${this.title}
        name=${ifDefined(isLink ? undefined : this.name)}
        value=${ifDefined(isLink ? undefined : this.value)}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        tabindex=${this.disabled ? '-1' : '0'}
        role=${ifDefined(isLink ? undefined : 'button')}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        ${this.loading ? html`
          <spk-loading
            class="button__loading"
            variant="button" 
            color="${this.color}"
          ></spk-loading>` : ''
        }
        <slot class="button__label"></slot>
      </${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spk-button': Button;
  }
}
