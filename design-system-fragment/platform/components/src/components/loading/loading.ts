import '../icon/icon.js';
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import SparkElement from '../../internal/spark-element.js';
import styles from './loading.styles';
import type { CSSResultGroup, TemplateResult } from 'lit';

@customElement('spk-loading')
export default class Loading extends SparkElement {
  static styles: CSSResultGroup = styles;

  /** Loading's icon */
  @property({ reflect: true }) variant: 'default' | 'button' = 'default';

  /** Loading icon's size */
  @property({ reflect: true })
    size: 's' | 'm' | 'l' | 'xl' | 'inherit' = 'inherit';

  /** Loading icon's colors */
  @property({ reflect: true }) color:'primary' | 'secondary' | 'tertiary' | 'raw' = 'primary';

  @property() name = '';

  private getVariant() {
    if (this.variant === 'button') {
      return 'button-loading';
    }

    return 'loading';
  }

  public render(): TemplateResult {
    return html`
      <span class="loading">
        <spk-icon 
          name=${this.getVariant()}
          size="${this.size}"
          color="${this.color}"
        ></spk-icon>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spk-loading': Loading;
  }
}
