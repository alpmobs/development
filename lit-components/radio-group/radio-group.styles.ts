import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: block;
  }

  .radio-group {
    border: none;
    padding: 0;
    margin: 0;
  }

  .radio-group__label {
    padding: 0;
    font-family: var(--spk-input-label-font-family);
    font-weight: var(--spk-input-label-font-weight);
    font-size: var(--spk-input-label-font-size);
    color: var(--spk-input-label-color);
    line-height: 140%;
  }

  .radio-group--has-label .radio-group__label {
    display: block;
  }

  .radio-group__helper-text {
    font-family: var(--spk-input-helper-font-family);
    font-weight: var(--spk-input-helper-font-weight);
    font-size: var(--spk-input-helper-font-size);
    color: var(--spk-input-helper-color);
    line-height: 140%;
    margin-bottom: var(--spk-input-helper-margin-bottom);
    display: inline-block;
  }

  .radio-group:not(.radio-group--has-helper-text) .radio-group__helper-text {
    display: none;
  }

  /* Required */
  .radio-group--required .radio-group__label::after {
    content: '*';
    color: var(--spk-input-label-required-color);
  }
`;
