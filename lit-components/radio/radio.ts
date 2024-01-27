import { classMap } from 'lit/directives/class-map.js';
import {
  customElement, property, state,
} from 'lit/decorators.js';
import { html } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { watch } from '../../internal/watch.js';
import SparkElement from '../../internal/spark-element.js';
import styles from './radio.styles';
import type { CSSResultGroup, TemplateResult } from 'lit';

@customElement('spk-radio')
export default class Radio extends SparkElement {
  static styles: CSSResultGroup = styles;

  @state() checked = false;

  @state() private hasFocus = false;

  /** The radio's value. When selected, the radio group will receive this value. */
  @property() value: string;

  /** The radio's label. */
  @property() label: string;

  /** The radio's ID. */
  @property() id: string;

  /** The radio's name. */
  @property() name: string;

  /** Disables the radio item. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * The radio item's size. When used inside a radio group, the size will be determined by the radio group's size so
   * this attribute can typically be omitted.
   */
  @property({ reflect: true }) size: 's' | 'l' = 's';

  @property({ type: Boolean, reflect: true }) error = false;

  constructor() {
    super();
    this.addEventListener('blur', this.handleBlur);
    this.addEventListener('click', this.handleClick);
    this.addEventListener('focus', this.handleFocus);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setInitialAttributes();
  }

  private handleBlur = () => {
    this.hasFocus = false;
    this.emit('spk-blur');
  };

  private handleClick = () => {
    if (!this.disabled) {
      this.checked = true;
    }
  };

  private handleFocus = () => {
    this.hasFocus = true;
    this.emit('spk-focus');
  };

  private setInitialAttributes() {
    this.setAttribute('role', 'radio');
    this.setAttribute('tabindex', '-1');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  @watch('checked')
  handleCheckedChange() {
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    this.setAttribute('tabindex', this.checked ? '0' : '-1');
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  public render(): TemplateResult {
    return html`
      <span
        role="radio"
        aria-checked="${this.checked}" 
        class=${classMap({
          radio: true,
          'radio--checked': this.checked,
          'radio--disabled': this.disabled,
          'radio--focused': this.hasFocus,
          'radio--error': this.error,
          'radio--s': this.size === 's',
          'radio--l': this.size === 'l',
        })}
        aria-labelledby="${ifDefined(this.label)}"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        type="radio"
        name=${ifDefined(this.name)}
        id=${ifDefined(this.id)}
        value=${ifDefined(this.value)}
        @click=${this.handleClick}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
      >
        <span class="radio__control"></span>
        <slot class="radio__label"></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spk-radio': Radio;
  }
}
