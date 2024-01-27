import { classMap } from 'lit/directives/class-map.js';
import {
  customElement, property, query, state,
} from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot.js';
import { html } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { watch } from '../../internal/watch.js';
import SparkElement from '../../internal/spark-element.js';
import styles from './radio-group.styles';
import type { CSSResultGroup, TemplateResult } from 'lit';
import type Radio from '../radio/radio';

@customElement('spk-radio-group')
export default class RadioGroup extends SparkElement {
  static styles: CSSResultGroup = styles;

  private hasSlotController = new HasSlotController(this, 'label');

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  @state() defaultValue = '';

  /** The name of the radio group, submitted as a name/value pair with form data. */
  @property() name = 'option';

  /** The current value of the radio group, submitted as a name/value pair with form data. */
  @property({ reflect: true }) value = '';

  /**
   * The radio group's label. Required for proper accessibility. If you need to display HTML, use the `label` slot
   * instead.
   */
  @property() label = '';

  /** The radio's ID. */
  @property() id: string;

  /** The radio group's Helper Text. */
  @property() helperText: string;

  /**
   * The radio button's size. When used inside a radio group, the size will be determined by the radio group's size so
   * this attribute can typically be omitted.
   */
  @property({ reflect: true }) size: 's' | 'l' = 's';

  /** Disables the radio item. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Ensures a child radio is checked before allowing the containing form to submit. */
  @property({ type: Boolean, reflect: true }) required = false;

  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
  }

  private getAllRadios() {
    return [...this.querySelectorAll<Radio>('spk-radio')];
  }

  private handleRadioClick(event: MouseEvent) {
    const target = (event.target as HTMLElement).closest<Radio>('spk-radio')!;
    const radios = this.getAllRadios();
    const oldValue = this.value;

    if (target.disabled) {
      return;
    }

    this.value = target.value;
    radios.forEach((radio) => (radio.checked = radio === target));

    if (this.value !== oldValue) {
      this.emit('spk-change');
      this.emit('spk-input');
    }
  }

  private handleLabelClick() {
    const radios = this.getAllRadios();
    const checked = radios.find((radio) => radio.checked);
    const radioToFocus = checked || radios[0];

    // Move focus to the checked radio (or the first one if none are checked) when clicking the label
    if (radioToFocus) {
      radioToFocus.focus();
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
      return;
    }

    const radios = this.getAllRadios().filter((radio) => !radio.disabled);
    const checkedRadio = radios.find((radio) => radio.checked) ?? radios[0];
    // eslint-disable-next-line no-nested-ternary
    const incr = event.key === ' ' ? 0 : ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
    const oldValue = this.value;
    let index = radios.indexOf(checkedRadio) + incr;

    if (index < 0) {
      index = radios.length - 1;
    }

    if (index > radios.length - 1) {
      index = 0;
    }

    this.value = radios[index].value;
    radios[index].checked = true;

    if (this.value !== oldValue) {
      this.emit('spk-change');
      this.emit('spk-input');
    }

    event.preventDefault();
  }

  private async syncRadioElements() {
    const radios = this.getAllRadios();

    await Promise.all(
      // Sync the checked state and size
      radios.map(async (radio) => {
        await radio.updateComplete;
        radio.checked = radio.value === this.value;
        radio.size = this.size;
      }),
    );

    if (!radios.some((radio) => radio.checked)) {
      radios[0].tabIndex = 0;
    }
  }

  private syncRadios() {
    if (customElements.get('spk-radio')) {
      this.syncRadioElements();
      return;
    }

    if (customElements.get('spk-radio')) {
      this.syncRadioElements();
    } else {
      customElements.whenDefined('spk-radio').then(() => this.syncRadios());
    }
  }

  private updateCheckedRadio() {
    const radios = this.getAllRadios();
    radios.forEach((radio) => (radio.checked = radio.value === this.value));
  }

  @watch('size', { waitUntilFirstUpdate: true })
  handleSizeChange() {
    this.syncRadios();
  }

  @watch('value')
  handleValueChange() {
    if (this.hasUpdated) {
      this.updateCheckedRadio();
    }
  }

  public render(): TemplateResult {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const defaultSlot = html`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;

    return html`
      <fieldset
          class=${classMap({
            'radio-group': true,
            'radio-group--has-label': hasLabel,
            'radio-group--has-helper-text': this.helperText,
            'radio-group--required': this.required,
          })}
          role="radiogroup"
          aria-labelledby="label"
          value=${ifDefined(this.value)}
          name=${ifDefined(this.name)}
        >
          <label
            id="label"
            class="radio-group__label"
            aria-hidden=${hasLabel ? 'false' : 'true'}
            @click=${this.handleLabelClick}
          >
            <slot name="label">${this.label}</slot>
          </label>
          <span class="radio-group__helper-text">${this.helperText}</span>
            ${defaultSlot}

        </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spk-radio-group': RadioGroup;
  }
}
