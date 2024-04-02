import { classMap } from 'lit/directives/class-map.js';
import {
  customElement, property, query,
} from 'lit/decorators.js';
import { html, literal } from 'lit/static-html.js';
import SparkElement from '../../internal/spark-element.js';
import styles from './text.styles';
import type { CSSResultGroup, TemplateResult } from 'lit';

@customElement('spk-text')
export default class Text extends SparkElement {
  static styles: CSSResultGroup = styles;

  @query('.text') text: HTMLElement;

  /** Text's type */
  @property({ reflect: true })
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' = 'p';

  /** Text's size */
  @property({ reflect: true })
    size: 'display-1' | 'display-2' | 'display-3' | 'display-4' |
      'body-1' | 'body-2' | 'body-3' | 'body-4' | 'body-5' | 'small-1' | 'small-2' | 'initial' = 'initial';

  /** Text's colors */
  @property({ reflect: true })
    color: 'primary' | 'secondary' | 'label' | 'neutral' | 'success' | 'error' | 'warning' |
      'subdued' | 'contrast' | 'emphasize-primary' | 'emphasize-secondary' | 'initial' = 'initial';

  /** Text's font family */
  @property({ reflect: true }) fontFamily: 'primary' | 'secondary' | 'initial' = 'initial';

  /** Text's ellipsis */
  @property({ type: Boolean }) truncated = false;

  /** Text's variants */
  @property({ reflect: true })
    variant: 'regular' | 'underline' | 'italic' | 'bold' | 'bold-italic' | 'bold-underline' | 'initial' = 'initial';

  private tagHandler() {
    switch (this.type) {
      case 'h1':
        return literal`h1`;
      case 'h2':
        return literal`h2`;
      case 'h3':
        return literal`h3`;
      case 'h4':
        return literal`h4`;
      case 'h5':
        return literal`h5`;
      case 'h6':
        return literal`h6`;
      case 'p':
        return literal`p`;
      case 'span':
        return literal`span`;
      case 'label':
        return literal`label`;
      default:
        return literal`p`;
    }
  }

  public render(): TemplateResult {
    const tag = this.tagHandler();

    /* eslint-disable lit/no-invalid-html */
    /* eslint-disable lit/binding-positions */
    return html`<${tag}
      class=${classMap({
        'text--primary': this.color === 'primary',
        'text--secondary': this.color === 'secondary',
        'text--label': this.color === 'label',
        'text--neutral': this.color === 'neutral',
        'text--success': this.color === 'success',
        'text--error': this.color === 'error',
        'text--warning': this.color === 'warning',
        'text--subdued': this.color === 'subdued',
        'text--contrast': this.color === 'contrast',
        'text--emphasize-primary': this.color === 'emphasize-primary',
        'text--emphasize-secondary': this.color === 'emphasize-secondary',

        'text--display-1': this.size === 'display-1',
        'text--display-2': this.size === 'display-2',
        'text--display-3': this.size === 'display-3',
        'text--display-4': this.size === 'display-4',
        'text--body-1': this.size === 'body-1',
        'text--body-2': this.size === 'body-2',
        'text--body-3': this.size === 'body-3',
        'text--body-4': this.size === 'body-4',
        'text--body-5': this.size === 'body-5',
        'text--small-1': this.size === 'small-1',
        'text--small-2': this.size === 'small-2',

        'text--font-primary': this.fontFamily === 'primary',
        'text--font-secondary': this.fontFamily === 'secondary',

        'text--variant-regular': this.variant === 'regular',
        'text--variant-bold': this.variant === 'bold',
        'text--variant-italic': this.variant === 'italic',
        'text--variant-underline': this.variant === 'underline',
        'text--variant-bold-italic': this.variant === 'bold-italic',
        'text--variant-bold-underline': this.variant === 'bold-underline',

        'text--truncated': this.truncated,
      })}
      >
      <slot></slot>
    </${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spk-text': Text;
  }
}
