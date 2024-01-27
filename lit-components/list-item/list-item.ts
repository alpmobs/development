import { classMap } from 'lit/directives/class-map.js';
import {
  customElement, property, query,
} from 'lit/decorators.js';
import { html, literal } from 'lit/static-html.js';
import SparkElement from '../../internal/spark-element.js';
import styles from './list-item.styles';
import type { CSSResultGroup, TemplateResult } from 'lit';

@customElement('spk-list-item')
export default class ListItem extends SparkElement {
  static styles: CSSResultGroup = styles;

  @query('.listItem') list: HTMLElement;

  @property({ type: Boolean, reflect: true }) indent = false;

  getParentType(): string | null {
    return this.parentElement ? this.parentElement.getAttribute('type') : 'ul';
  }

  private getTag() {
    switch (this.getParentType()) {
      case 'ul':
        return literal`li`;
      case 'ol':
        return literal`li`;
      case 'dl':
        return this.indent ? literal`dd` : literal`dt`;
      default:
        return literal`li`;
    }
  }

  public render(): TemplateResult {
    const tag = this.getTag();

    /* eslint-disable lit/no-invalid-html */
    /* eslint-disable lit/binding-positions */
    return html`
      <${tag}
        class=${classMap({
          listItem: true,
        })}
      >
        <slot></slot>
      </${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spk-list-item': ListItem;
  }
}
