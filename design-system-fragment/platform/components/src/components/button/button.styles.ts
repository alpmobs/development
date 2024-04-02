import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  :host([fullwidth]) {
    width: 100%;
  }

  :host([disabled]) {
    cursor: not-allowed;
  }

  :host([loading]) {
    cursor: wait;
  }

  .button {
    font-family: var(--spk-button-font-family);
    font-size: inherit;
    text-decoration: none;
    text-transform: var(--spk-button-text-transform);
    font-weight: var(--spk-button-font-weight);
    width: auto;
    cursor: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .button:disabled,
  .button.button--disabled {
    pointer-events: none;
  }

  /* Button Style & Colors | Primary */
  .button--primary,
  .button--primary:link,
  .button--primary:visited {
    border-style: var(--spk-button-border-style-primary-default);
    border-color: var(--spk-button-border-color-primary-default);
    border-width: var(--spk-button-border-width-primary-default);
    box-shadow: var(--spk-button-box-shadow-primary-default);
    opacity: var(--spk-button-opacity-primary-default);
    background: var(--spk-button-background-color-primary-default);
    color: var(--spk-button-color-text-primary-default);
  }

  .button--primary:hover {
    border-style: var(--spk-button-border-style-primary-hover);
    border-color: var(--spk-button-border-color-primary-hover);
    border-width: var(--spk-button-border-width-primary-hover);
    box-shadow: var(--spk-button-box-shadow-primary-hover);
    opacity: var(--spk-button-opacity-primary-hover);
    background: var(--spk-button-background-color-primary-hover);
    color: var(--spk-button-color-text-primary-hover);
  }

  .button--primary:active {
    border-style: var(--spk-button-border-style-primary-active);
    border-color: var(--spk-button-border-color-primary-active);
    border-width: var(--spk-button-border-width-primary-active);
    box-shadow: var(--spk-button-box-shadow-primary-active);
    opacity: var(--spk-button-opacity-primary-active);
    background: var(--spk-button-background-color-primary-active);
    color: var(--spk-button-color-text-primary-active);
  }

  .button--primary:disabled,
  .button--primary.button--disabled  {
    border-style: var(--spk-button-border-style-primary-disabled);
    border-color: var(--spk-button-border-color-primary-disabled);
    border-width: var(--spk-button-border-width-primary-disabled);
    box-shadow: var(--spk-button-box-shadow-primary-disabled);
    opacity: var(--spk-button-opacity-primary-disabled);
    background: var(--spk-button-background-color-primary-disabled);
    color: var(--spk-button-color-text-primary-disabled);
  }

  /* Button Style & Colors | Secondary */
  .button--secondary,
  .button--secondary:link,
  .button--secondary:visited {
    border-style: var(--spk-button-border-style-secondary-default);
    border-color: var(--spk-button-border-color-secondary-default);
    border-width: var(--spk-button-border-width-secondary-default);
    box-shadow: var(--spk-button-box-shadow-secondary-default);
    opacity: var(--spk-button-opacity-secondary-default);
    background: var(--spk-button-background-color-secondary-default);
    color: var(--spk-button-color-text-secondary-default);
  }

  .button--secondary:hover {
    border-style: var(--spk-button-border-style-secondary-hover);
    border-color: var(--spk-button-border-color-secondary-hover);
    border-width: var(--spk-button-border-width-secondary-hover);
    box-shadow: var(--spk-button-box-shadow-secondary-hover);
    opacity: var(--spk-button-opacity-secondary-hover);
    background: var(--spk-button-background-color-secondary-hover);
    color: var(--spk-button-color-text-secondary-hover);
  }

  .button--secondary:active {
    border-style: var(--spk-button-border-style-secondary-active);
    border-color: var(--spk-button-border-color-secondary-active);
    border-width: var(--spk-button-border-width-secondary-active);
    box-shadow: var(--spk-button-box-shadow-secondary-active);
    opacity: var(--spk-button-opacity-secondary-active);
    background: var(--spk-button-background-color-secondary-active);
    color: var(--spk-button-color-text-secondary-active);
  }

  .button--secondary:disabled,
  .button--secondary.button--disabled  {
    border-style: var(--spk-button-border-style-secondary-disabled);
    border-color: var(--spk-button-border-color-secondary-disabled);
    border-width: var(--spk-button-border-width-secondary-disabled);
    box-shadow: var(--spk-button-box-shadow-secondary-disabled);
    opacity: var(--spk-button-opacity-secondary-disabled);
    background: var(--spk-button-background-color-secondary-disabled);
    color: var(--spk-button-color-text-secondary-disabled);
  }

  /* Button Style & Colors | Tertiary */
  .button--tertiary,
  .button--tertiary:link,
  .button--tertiary:visited {
    border-style: var(--spk-button-border-style-tertiary-default);
    border-color: var(--spk-button-border-color-tertiary-default);
    border-width: var(--spk-button-border-width-tertiary-default);
    box-shadow: var(--spk-button-box-shadow-tertiary-default);
    opacity: var(--spk-button-opacity-tertiary-default);
    background: var(--spk-button-background-color-tertiary-default);
    color: var(--spk-button-color-text-tertiary-default);
  }

  .button--tertiary:hover {
    border-style: var(--spk-button-border-style-tertiary-hover);
    border-color: var(--spk-button-border-color-tertiary-hover);
    border-width: var(--spk-button-border-width-tertiary-hover);
    box-shadow: var(--spk-button-box-shadow-tertiary-hover);
    opacity: var(--spk-button-opacity-tertiary-hover);
    background: var(--spk-button-background-color-tertiary-hover);
    color: var(--spk-button-color-text-tertiary-hover);
  }

  .button--tertiary:active {
    border-style: var(--spk-button-border-style-tertiary-active);
    border-color: var(--spk-button-border-color-tertiary-active);
    border-width: var(--spk-button-border-width-tertiary-active);
    box-shadow: var(--spk-button-box-shadow-tertiary-active);
    opacity: var(--spk-button-opacity-tertiary-active);
    background: var(--spk-button-background-color-tertiary-active);
    color: var(--spk-button-color-text-tertiary-active);
  }

  .button--tertiary:disabled,
  .button--tertiary.button--disabled {
    border-style: var(--spk-button-border-style-tertiary-disabled);
    border-color: var(--spk-button-border-color-tertiary-disabled);
    border-width: var(--spk-button-border-width-tertiary-disabled);
    box-shadow: var(--spk-button-box-shadow-tertiary-disabled);
    opacity: var(--spk-button-opacity-tertiary-disabled);
    background: var(--spk-button-background-color-tertiary-disabled);
    color: var(--spk-button-color-text-tertiary-disabled);
  }

  .button--fullwidth {
    width: 100%;
  }

  /* Sizes */
  .button--s {
    height: var(--spk-button-height-s);
    padding-left: var(--spk-button-padding-x-s);
    padding-right: var(--spk-button-padding-x-s);
    font-size: var(--spk-button-font-size-s);
    border-radius: var(--spk-button-border-radius-s);
    letter-spacing: var(--spk-button-letter-spacing-s);
  }

  .button--s .button__loading {
    font-size: var(--spk-button-loading-size-s);
  }
  
  .button--m {
    height: var(--spk-button-height-m);
    padding-left: var(--spk-button-padding-x-m);
    padding-right: var(--spk-button-padding-x-m);
    font-size: var(--spk-button-font-size-m);
    border-radius: var(--spk-button-border-radius-m);
    letter-spacing: var(--spk-button-letter-spacing-m);
  }

  .button--m .button__loading {
    font-size: var(--spk-button-loading-size-m);
  }

  .button--l {
    height: var(--spk-button-height-l);
    padding-left: var(--spk-button-padding-x-l);
    padding-right: var(--spk-button-padding-x-l);
    font-size: var(--spk-button-font-size-l);
    border-radius: var(--spk-button-border-radius-l);
    letter-spacing: var(--spk-button-letter-spacing-l);
  }

  .button--l .button__loading {
    font-size: var(--spk-button-loading-size-l);
  }
  
  /* Loading */
  .button--loading {
    position: relative;
    pointer-events: none;
  }

  .button__loading {
    position: absolute;
  }

  .button--loading .button__label {
    visibility: hidden;
  }
`;
