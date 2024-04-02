import { classMap } from 'lit/directives/class-map.js';
import {
  customElement, property, query, state,
} from 'lit/decorators.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import SparkElement from '../../internal/spark-element.js';
import styles from './link.styles';
import type { CSSResultGroup, TemplateResult } from 'lit';

/**
 * Use to link from one page to another
 */
@customElement('spk-link')
export default class Link extends SparkElement {
  static styles: CSSResultGroup = styles;

  @query('.link') link: HTMLLinkElement;

  @state() private hasFocus = false;

  /** Indicates the destination of the hyperlink. */
  @property() href: string;

  /**
   * An attribute names a relationship of the linked document to the current document
   *
   * Possible values: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel
   */
  @property() rel = '';

  /** Tells the browser where to open the link. */
  @property() target: '_blank' | '_self' | '_top' | '_parent';

  /** The link's colors */
  @property({ reflect: true, type: String }) color: 'primary' | 'secondary' = 'primary';

  /**
   * The link's size.
   * When value is `inherit`, it will inherit the font-size of the parent container
   */
  @property({ reflect: true, type: String })
    size: '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | 'inherit' = 'inherit';

  private handleBlur() {
    this.hasFocus = false;
    this.emit('spk-blur');
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('spk-focus');
  }

  /** Simulates a click on the link. */
  click() {
    this.link.click();
  }

  /** Sets focus on the link. */
  focus(options?: FocusOptions) {
    this.link.focus(options);
  }

  /** Removes focus from the link. */
  blur() {
    this.link.blur();
  }

  public render(): TemplateResult {
    return html`<a
      href="${ifDefined(this.href ? this.href : undefined)}"
      target=${ifDefined(this.target ? this.target : undefined)}
      rel=${ifDefined(this.rel ? this.rel : undefined)}
      class=${classMap({
        link: true,
        'link--primary': this.color === 'primary',
        'link--secondary': this.color === 'secondary',
        'link--3xs': this.size === '3xs',
        'link--2xs': this.size === '2xs',
        'link--xs': this.size === 'xs',
        'link--s': this.size === 's',
        'link--m': this.size === 'm',
        'link--l': this.size === 'l',
        'link--xl': this.size === 'xl',
        'link--2xl': this.size === '2xl',
        'link--3xl': this.size === '3xl',
        'link--focused': this.hasFocus,
      })}
      tabindex="0"
      @blur=${this.handleBlur}
      @focus=${this.handleFocus}>
        <slot></slot>
    </a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spk-link': Link;
  }
}
