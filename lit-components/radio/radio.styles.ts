import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: block;
  }
  
  :host(:focus-visible) {
    outline: 0px;
    offset: 0px
  }

  .radio {
    display: flex;
    vertical-align: middle;
    cursor: pointer;
    gap: var(--spk-radio-container-padding);
    margin-top: var(--spk-input-margin-top);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-width: var(--spk-radio-border-width);
    border-style: var(--spk-radio-border-style);
    border-color: var(--spk-radio-border-color-default);
    border-radius: var(--spk-radio-radius);
    background-color: var(--spk-radio-background-color-default);
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--spk-radio-border-color-default);
    background-color: var(--spk-radio-background-color-default);
  }

  /* Checked */

  .radio:not(.radio--checked):not(.radio--disabled).radio--error .radio__control:hover {
    border-color: var(--spk-radio-border-color-error);
  }

  .radio--checked .radio__control,
  .radio.radio--error.radio--checked  .radio__control {
    background-color: var(--spk-radio-background-color-checked-default);
    border-color: var(--spk-radio-border-color-checked-default);
    box-shadow: var(--spk-radio-box-shadow-checked);
    position: relative;
  }

  /* Radio dot */
  .radio--checked .radio__control:after {
    border-radius: var(--spk-radio-radius);
    content: "";
    display: block;
    background-color:var(--spk-radio-dot-color-checked-default);
    position: absolute
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--spk-radio-border-color-checked-default);
    background-color: var(--spk-radio-background-color-checked-default);
  }

  /* :Label */
  .radio__label {
    display: inline-flex;
    font-family: var(--spk-toggle-label-font-family);
    color: var(--spk-toggle-label-color-default);
    font-size: var(--spk-toggle-label-font-size);
    font-weight: var(--spk-toggle-label-font-weight);
    align-items: center;
    user-select: none;
  }

  /* Radio Small */
  .radio--s .radio__control {
    width: var(--spk-toggle-size-s);
    height: var(--spk-toggle-size-s);
  }

  .radio--s.radio--checked .radio__control {
    background-color: var(--spk-radio-background-color-checked-default);
  }

  /* Radio Small dot */
  .radio--s.radio--checked .radio__control:after {
    height: var(--spk-radio-dot-s);
    width: var(--spk-radio-dot-s);
  }

  /* Radio Large Container */
  .radio--l.radio {
    background-color: var(--spk-toggle-container-background-color-default);
    border-radius: var(--spk-radio-container-border-radius);
    border-width: var(--spk-toggle-container-border-width);
    border-style: var(--spk-toggle-container-border-style);
    border-color: var(--spk-toggle-container-border-color-default);
    padding-left: var(--spk-radio-container-padding);
    padding-right: var(--spk-radio-container-padding);
    height: var(--spk-input-height);
  }
  
  /* Radio Large */
  .radio--l .radio__control {
    background-color: var(--spk-radio-background-color-default);
    width: var(--spk-toggle-size-l);
    height: var(--spk-toggle-size-l);
    align-self: center;
  }

  .radio--l.radio--checked .radio__control {
    background-color: var(--spk-radio-background-color-checked-default);
  }

  /* Radio Large dot */
  .radio--l.radio--checked .radio__control:after {
    height: var(--spk-radio-dot-l);
    width: var(--spk-radio-dot-l);
  }

  /* Disabled */
  .radio--disabled {
    
    cursor: not-allowed;
  }

  /* Disabled radio */
  .radio--disabled .radio__control {
    background-color: var(--spk-radio-background-color-disabled);
    border-color: var(--spk-radio-border-color-disabled);
  }

  .radio--disabled.radio--checked .radio__control {
    border-color: var(--spk-radio-border-color-checked-disabled);
  }

  .radio--disabled.radio--checked .radio__control::after {
    background-color:var(--spk-radio-dot-color-checked-disabled);
  }
 
  /* Disabled radio label */
  .radio--disabled .radio__label  {
    color: var(--spk-toggle-label-color-disabled);
  }

  .radio--l.radio--disabled.radio  {
    background-color: var(--spk-toggle-container-background-color-disabled);
    border-color: var(--spk-toggle-container-border-color-disabled);
  }
  .radio--s.radio--disabled,
  .radio--l.radio--disabled .radio__control {
    opacity: var(--spk-toggle-opacity-disabled);
  }

  /* ERROR */

  .radio--l.radio.radio--error {
    background-color: var(--spk-toggle-container-background-color-error);
    border-color: var(--spk-radio-border-color-error);
  }

  .radio.radio--error .radio__control {
    background-color: var(--spk-radio-background-color-error);
    border-color: var(--spk-radio-border-color-error);
  }

  .radio--l.radio.radio--error .radio__label {
    color: var(--spk-toggle-label-color-error);
  }
`;
