import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

/* TYPE SIZES */

  h1 {
    font-size: var(--spk-text-type-size-heading-1);
  }
  h2 {
    font-size: var(--spk-text-type-size-heading-2);
  }
  h3 {
    font-size: var(--spk-text-type-size-heading-3);
  }
  h4 {
    font-size: var(--spk-text-type-size-heading-4);
  }
  h5 {
    font-size: var(--spk-text-type-size-heading-5);
  }
  h6 {
    font-size: var(--spk-text-type-size-heading-6);
  }
  p {
    font-size: var(--spk-text-type-size-paragraph);
  }
  span {
    font-size: var(--spk-text-type-size-span);
  }
  label {
    font-size: var(--spk-text-type-size-label);
  }

/* TYPE COLORS */

  h1 {
    color: var(--spk-text-type-color-heading-1);
  }
  h2 {
    color: var(--spk-text-type-color-heading-2);
  }
  h3 {
    color: var(--spk-text-type-color-heading-3);
  }
  h4 {
    color: var(--spk-text-type-color-heading-4);
  }
  h5 {
    color: var(--spk-text-type-color-heading-5);
  }
  h6 {
    color: var(--spk-text-type-color-heading-6);
  }
  span {
    color: var(--spk-text-type-color-span);
  }
  p {
    color: var(--spk-text-type-color-p);
  }
  label {
    color: var(--spk-text-type-color-label);
  }

/* TYPE FONT FAMILY */

  h1, h2, h3, h4, h5, h6, p, span, label {
    font-family: var(--spk-text-font-family-primary);
  }

/* TYPE FONT WEIGHT */

  h1, h2, h3, h4, h5, h6 {
    font-weight: var(--spk-text-font-weight-bold);
  }
  p, span, label {
    font-weight: var(--spk-text-font-weight-regular);
  }

/* SIZES */

  .text--small-1 {
    font-size: var(--spk-text-size-small-1);
  }
  .text--small-2 {
    font-size: var(--spk-text-size-small-2);
  }
  .text--body-1 {
    font-size: var(--spk-text-size-body-1);
  }
  .text--body-2 {
    font-size: var(--spk-text-size-body-2);
  }
  .text--body-3 {
    font-size: var(--spk-text-size-body-3);
  }
  .text--body-4 {
    font-size: var(--spk-text-size-body-4);
  }
  .text--body-5 {
    font-size: var(--spk-text-size-body-5);
  }
  .text--display-1 {
    font-size: var(--spk-text-size-display-1);
  }
  .text--display-2 {
    font-size: var(--spk-text-size-display-2);
  }
  .text--display-3 {
    font-size: var(--spk-text-size-display-3);
  }
  .text--display-4 {
    font-size: var(--spk-text-size-display-4);
  }

/* COLORS */

  .text--primary {
    color: var(--spk-text-color-primary);
  }
  .text--secondary {
    color: var(--spk-text-color-secondary);
  }
  .text--label {
    color: var(--spk-text-color-label);
  }
  .text--neutral {
    color: var(--spk-text-color-neutral);
  }
  .text--success {
    color: var(--spk-text-color-success);
  }
  .text--warning {
    color: var(--spk-text-color-warning);
  }
  .text--error {
    color: var(--spk-text-color-error);
  }
  .text--subdued {
    color: var(--spk-text-color-subdued);
  }
  .text--contrast {
    color: var(--spk-text-color-contrast);
  }
  .text--emphasize-primary {
    color: var(--spk-text-color-emphasize-primary);
  }
  .text--emphasize-secondary {
    color: var(--spk-text-color-emphasize-secondary);
  }

/* FONT FAMILY */

  .text--font-primary {
    font-family: var(--spk-text-font-family-primary);
  }
  .text--font-secondary {
    font-family: var(--spk-text-font-family-secondary);
  }

/* VARIANTS */

  .text--variant-regular {
    font-weight: var(--spk-text-font-weight-regular);
  }
  .text--variant-underline {
    text-decoration: underline;
  }
  .text--variant-italic {
    font-style: italic;
  }
  .text--variant-bold {
    font-weight: var(--spk-text-font-weight-bold);
  }
  .text--variant-bold-italic {
    font-weight: var(--spk-text-font-weight-bold);
    font-style: italic;
  }
  .text--variant-bold-underline {
    font-weight: var(--spk-text-font-weight-bold);
    text-decoration: underline;
  }

/* TRUNCATED */
  .text--truncated {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

`;
