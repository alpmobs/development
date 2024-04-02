import { classMap } from 'lit/directives/class-map.js';
import {
  customElement, property, query,
} from 'lit/decorators.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import SparkElement from '../../internal/spark-element.js';
import styles from './icon.styles';
import type { CSSResultGroup, TemplateResult } from 'lit';

@customElement('spk-icon')
export default class Icon extends SparkElement {
  static styles: CSSResultGroup = styles;

  @query('.icon') icon: HTMLElement;

  /** Icon's name */
  @property({ reflect: true })
    name = '';

  /** Icon's size */
  @property({ reflect: true })
    size: 's' | 'm' | 'l' | 'xl' | 'inherit' = 'inherit';

  /** Icon's colors */
  @property({ reflect: true }) color:'primary'|'secondary'|'tertiary'|'raw' = 'primary';

  public render(): TemplateResult {
    return html`<i
      name=${ifDefined(this.name ? this.name : undefined)}
      class=${classMap({
        icon: true,
        'icon--primary': this.color === 'primary',
        'icon--secondary': this.color === 'secondary',
        'icon--tertiary': this.color === 'tertiary',
        'icon--raw': this.color === 'raw',
        'icon--s': this.size === 's',
        'icon--m': this.size === 'm',
        'icon--l': this.size === 'l',
        'icon--xl': this.size === 'xl',
      })}
      >
    </i>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spk-icon': Icon;
  }
}
