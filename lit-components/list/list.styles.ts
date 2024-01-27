import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  .list {
    font-family: var(--spk-list-font-family);
    font-weight: var(--spk-list-font-weight-regular);
    font-size: inherit;
  }

  .list--primary {
    color: var(--spk-list-color-text-primary);
  }

  .list--secondary {
    color: var(--spk-list-color-text-secondary);
  }

  .list--contrast {
    color: var(--spk-list-color-text-contrast);
  }

  /* Sizes */
  .list--3xs {
    font-size: var(--spk-list-font-size-3xs);
  }

  .list--2xs {
    font-size: var(--spk-list-font-size-2xs);
  }

  .list--xs {
    font-size: var(--spk-list-font-size-xs);
  }

  .list--s {
    font-size: var(--spk-list-font-size-s);
  }

  .list--m {
    font-size: var(--spk-list-font-size-m);
  }

  .list--l {
    font-size: var(--spk-list-font-size-l);
  }

  .list--xl {
    font-size: var(--spk-list-font-size-xl);
  }

  .list--2xl {
    font-size: var(--spk-list-font-size-2xl);
  }

  .list--3xl {
    font-size: var(--spk-list-font-size-3xl);
  }

  .list--type-none {
    list-style-type: none;
  }

  ul.list--type-disc {
    list-style-type: disc;
  }

  ul.list--type-circle {
    list-style-type: circle;
  }

  ul.list--type-square {
    list-style-type: square;
  }

  ol.list--type-decimal {
    list-style-type: decimal;
  }

  ol.list--type-decimal-leading-zero {
    list-style-type: decimal-leading-zero;
  }

  ol.list--type-lower-roman {
    list-style-type: lower-roman;
  }

  ol.list--type-upper-roman {
    list-style-type: upper-roman;
  }

  ol.list--type-lower-alpha {
    list-style-type: lower-alpha
  }
  
  ol.list--type-upper-alpha {
    list-style-type: upper-alpha
  }

  dl {
    list-style-type: none;
  }

  .list--position-inside {
    list-style-position: inside;
  }

  .list--position-outside {
    list-style-position: outside;
  }

  .list--variant-regular {
    font-style: normal;
  }

  .list--variant-underline, .list--variant-bold-underline  {
    text-decoration: underline;
  }

  .list--variant-italic, .list--variant-bold-italic {
    font-style: italic;
  }

  .list--variant-bold, .list--variant-bold-underline, .list--variant-bold-italic {
    font-weight: var(--spk-list-font-weight-bold);
  }

`;
