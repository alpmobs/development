import '../list-item/list-item.js';
import { classMap } from 'lit/directives/class-map.js';
import {
  customElement, property, query,
} from 'lit/decorators.js';
import { html, literal } from 'lit/static-html.js';
import SparkElement from '../../internal/spark-element.js';
import styles from './list.styles';
import type { CSSResultGroup, TemplateResult } from 'lit';

/**
 * HTML lists enable web developers to categorize a collection of related items within lists.
 */
@customElement('spk-list')
export default class List extends SparkElement {
  static styles: CSSResultGroup = styles;

  /** Set the type of list items */
  @property({ reflect: true }) type: 'ul' | 'ol' | 'dl' = 'ul';

  @query('.list') list: HTMLElement;

  /** Set the size of list items */
  @property({ reflect: true })
    size: '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | 'inherit' = 'inherit';

  /** Set the color of list items */
  @property({ reflect: true }) color: 'primary' | 'secondary' | 'contrast' = 'primary';

  /** Set the different list style types */
  @property({ reflect: true })
    marker: 'none' | 'disc' | 'circle' | 'square' | 'decimal' | 'decimal-leading-zero' |
    'lower-roman' | 'upper-roman' | 'lower-alpha' | 'upper-alpha' = 'disc';

  /** Set the position of list items */
  @property() position: 'inside' | 'outside' = 'inside';

  /** Set the variant style of list items */
  @property()
    variant: 'regular' | 'underline' | 'italic' | 'bold' | 'bold-underline' | 'bold-italic' = 'regular';

  private getTag() {
    switch (this.type) {
      case 'ul':
        return literal`ul`;
      case 'ol':
        return literal`ol`;
      case 'dl':
        return literal`dl`;
      default:
        return literal`ul`;
    }
  }

  public render(): TemplateResult {
    const tag = this.getTag();

    /* eslint-disable lit/no-invalid-html */
    /* eslint-disable lit/binding-positions */
    return html`
      <${tag}
        class=${classMap({
          list: true,
          'list--primary': this.color === 'primary',
          'list--secondary': this.color === 'secondary',
          'list--contrast': this.color === 'contrast',
          'list--3xs': this.size === '3xs',
          'list--2xs': this.size === '2xs',
          'list--xs': this.size === 'xs',
          'list--s': this.size === 's',
          'list--m': this.size === 'm',
          'list--l': this.size === 'l',
          'list--xl': this.size === 'xl',
          'list--2xl': this.size === '2xl',
          'list--3xl': this.size === '3xl',
          'list--type-none': this.marker === 'none',
          'list--type-disc': this.marker === 'disc',
          'list--type-circle': this.marker === 'circle',
          'list--type-square': this.marker === 'square',
          'list--type-decimal': this.marker === 'decimal',
          'list--type-decimal-leading-zero': this.marker === 'decimal-leading-zero',
          'list--type-lower-roman': this.marker === 'lower-roman',
          'list--type-upper-roman': this.marker === 'upper-roman',
          'list--type-lower-alpha': this.marker === 'lower-alpha',
          'list--type-upper-alpha': this.marker === 'upper-alpha',
          'list--position-inside': this.position === 'inside',
          'list--position-outside': this.position === 'outside',
          'list--variant-regular': this.variant === 'regular',
          'list--variant-underline': this.variant === 'underline',
          'list--variant-italic': this.variant === 'italic',
          'list--variant-bold': this.variant === 'bold',
          'list--variant-bold-underline': this.variant === 'bold-underline',
          'list--variant-bold-italic': this.variant === 'bold-italic',
        })}
      >
        <slot></slot>
      </${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spk-list': List;
  }
}
