import { classMap } from 'lit/directives/class-map.js';
import {
  customElement, property, query, state
} from 'lit/decorators.js';
import { defaultValue } from '../../internal/default-value.js';
import { FormControlController } from '../../internal/form.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { watch } from '../../internal/watch.js';
import SparkElement from '../../internal/spark-element.js';
import styles from './checkbox.styles';
import type { CSSResultGroup, TemplateResult } from 'lit';
import type { SparkFormControl } from '../../internal/spark-element.js';

@customElement('spk-checkbox')
export default class Checkbox extends SparkElement implements SparkFormControl {
  static styles: CSSResultGroup = styles;

  private readonly formControlController = new FormControlController(this, {
    value: (control: Checkbox) => (control.checked ? control.value || 'on' : undefined),
    defaultValue: (control: Checkbox) => control.defaultChecked,
    setValue: (control: Checkbox, checked: boolean) => (control.checked = checked)
  });

  @query('#container') container: HTMLElement;

  @query('input[type="checkbox"]') input: HTMLInputElement;

  @state() private hasFocus = false;

  @property() title = ''; // make reactive to pass through

  @query('.checkbox') checkbox: HTMLElement;

  /** Name attribute */
  @property({ reflect: false }) name = '';

  /** Value attribute */
  @property({ reflect: false }) value: string;

  /** Size variants */
  @property({ reflect: true }) size: 's' | 'l' = 's';

  /** Disabled state */
  @property({ type: Boolean }) disabled = false;

  /** Checked state */
  @property({ type: Boolean }) checked = false;

  /**
   * Draws the checkbox in an indeterminate state. This is usually applied to checkboxes that represents a "select
   * all/none" behavior when associated checkboxes have a mix of checked and unchecked states.
   */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue('checked') defaultChecked = false;

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  /** Makes the checkbox a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Checkbox's TAB INDEX - optional */
  @property({ type: Number }) order = '';

  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
  }

  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }

  firstUpdated() {
    this.formControlController.updateValidity();
  }

  private handleClick() {
    this.checked = !this.checked;
    this.indeterminate = false;
    this.emit('spk-change');
  }

  private handleBlur() {
    this.hasFocus = false;
    this.emit('spk-blur');
  }

  private handleInput() {
    this.emit('spk-input');
  }

  private handleInvalid(event: Event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('spk-focus');
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid
    this.formControlController.setValidity(this.disabled);
  }

  @watch(['checked', 'indeterminate'], { waitUntilFirstUpdate: true })
  handleStateChange() {
    this.input.checked = this.checked; // force a sync update
    this.input.indeterminate = this.indeterminate; // force a sync update
    this.formControlController.updateValidity();
  }

  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }

  /** Sets focus on the checkbox. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the checkbox. */
  blur() {
    this.input.blur();
  }

  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.input.checkValidity();
  }

  /** Gets the associated form, if one exists. */
  getForm(): HTMLFormElement | null {
    return this.formControlController.getForm();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    // TODO: Replace code below and use alert component instead of browser's default alert message
    return this.input.reportValidity();
  }

  /**
   * Sets a custom validation message. The value provided will be shown to the user when the form is submitted. To clear
   * the custom validation message, call this method with an empty string.
   */
  setCustomValidity(message: string) {
    // TODO: Replace code below and use alert component method to set the validation message
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }

  public render(): TemplateResult {
    return html`
    <div 
      id="container"
      class="${classMap({
        'checkbox--item': true,
        'checkbox--s': this.size === 's',
        'checkbox--l': this.size === 'l',
        'checkbox--disabled': this.disabled,
        'checkbox--required': this.required,
        'checkbox--focused': this.hasFocus,
      })}"
    >
      <input 
          id="checkbox"
          class="checkbox__input"
          type="checkbox"
          title=${this.title /* An empty title prevents browser validation tooltips from appearing on hover */}
          name=${ifDefined(this.name ? this.name : undefined)}
          value=${ifDefined(this.value)}
          .indeterminate=${live(this.indeterminate)}
          .checked=${live(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          aria-checked=${this.checked ? 'true' : 'false'}
          tabindex=${ifDefined(this.order ? this.order : undefined)}
          @click=${this.handleClick}
          @input=${this.handleInput}
          @invalid=${this.handleInvalid}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
      />
      <label class="checkbox__label" for="checkbox">
        <slot></slot>
      </label>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spk-checkbox': Checkbox;
  }
}
