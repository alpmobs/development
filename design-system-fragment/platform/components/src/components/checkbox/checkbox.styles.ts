import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

/* CHECKBOX INPUT */

.checkbox__input {
  cursor: pointer;
  -webkit-appearance: none;
  position: relative;
  display: inline-block;

  border-width: var(--spk-checkbox-border-width);
  border-style: var(--spk-checkbox-border-style);
  border-color: var(--spk-checkbox-border-color-default);
  background-color: var(--spk-checkbox-background-color-default);
}

/* CHECKBOX CHECKMARK */

.checkbox__input:before {
  content: inherit;
  position: absolute;
  border-style: solid;
  border-right-width: 0;
  border-top-width: 0;
  -ms-transform: rotate(-50deg);
  -webkit-transform: rotate(-50deg);
  transform: rotate(-50deg);
  border-color: var(--spk-checkbox-checkmark-color-default);
  width: 79%;
  height: 40%;
  left: 9.5%;
  top: 21%;
}

/* CHECKED */

.checkbox__input:checked:before {
  content: "";
  border-color: var(--spk-checkbox-checkmark-color-checked-default);
}

.checkbox__input:checked {
  background-color: var(--spk-checkbox-background-color-checked-default);
  border-color: var(--spk-checkbox-border-color-checked-default);
}

.checkbox--item:not(.checkbox--l) .checkbox__input:checked {
  box-shadow: var(--spk-checkbox-box-shadow-checked-s);
}

.checkbox--l .checkbox__input:checked {
  box-shadow: var(--spk-checkbox-box-shadow-checked-l);
}

/* LABEL */

.checkbox__label {
  font-family: var(--spk-toggle-label-font-family);
  font-size: var(--spk-toggle-label-font-size);
  font-weight: var(--spk-toggle-label-font-weight);
  color: var(--spk-toggle-label-color-default);
}

/* CHECKBOX CONTAINER */

.checkbox--item {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 10px;
}

/* SMALL */

.checkbox--item:not(.checkbox--l) .checkbox__input {
  width: var(--spk-toggle-size-s);
  height: var(--spk-toggle-size-s);
  border-radius: var(--spk-checkbox-border-radius-s);
  box-shadow: var(--spk-checkbox-box-shadow-default-s);
}

.checkbox--item:not(.checkbox--l) .checkbox__input:before {
  border-left-width: var(--spk-checkbox-checkmark-border-width-s);
  border-bottom-width: var(--spk-checkbox-checkmark-border-width-s);
}

/* LARGE */

.checkbox--l {
  height:  var(--spk-input-height);
  border-style: var(--spk-toggle-container-border-style);
  border-width: var(--spk-toggle-container-border-width);
  border-color: var(--spk-toggle-container-border-color-default);

  border-radius: var(--spk-checkbox-container-border-radius);
  background-color: var(--spk-toggle-container-background-color-default);
  padding: var(--spk-checkbox-container-padding);
  
}

.checkbox--l .checkbox__input {
  width: var(--spk-toggle-size-l);
  height: var(--spk-toggle-size-l);
  border-radius: var(--spk-checkbox-border-radius-l);
  box-shadow: var(--spk-checkbox-box-shadow-default-l);
}

.checkbox--l .checkbox__input:before {
  border-left-width: var(--spk-checkbox-checkmark-border-width-l);
  border-bottom-width: var(--spk-checkbox-checkmark-border-width-l);
}

/* DISABLED */
.checkbox--disabled {
  opacity: var(--spk-toggle-opacity-disabled);
  border-color: var(--spk-toggle-container-border-color-disabled);
}

.checkbox--disabled.checkbox--l {
  background-color: var(--spk-toggle-container-background-color-disabled);
}

.checkbox__input:disabled {
  cursor: not-allowed;
  border-color: var(--spk-checkbox-border-color-disabled);
  background-color: var(--spk-checkbox-background-color-disabled);
}

.checkbox__input:before:disabled {
  border-color: var(--spk-checkbox-checkmark-color-disabled);
}

.checkbox__input:checked:disabled {
  background-color: var(--spk-checkbox-background-color-checked-disabled);
  border-color: var(--spk-checkbox-border-color-checked-disabled);
}

.checkbox--disabled .checkbox__label {
  color: var(--spk-toggle-label-color-disabled);
}

/* ERROR */

.checkbox--item[data-user-invalid] .checkbox__input, /* input border */
.checkbox--item[data-user-invalid] /* item border */
{
  border-color: var(--spk-checkbox-border-color-error);
}

/* LABEL */
.checkbox--item[data-user-invalid] .checkbox__label {
  color: var(--spk-toggle-label-color-default);
}

/* REQUIRED */

.checkbox--required .checkbox__label::after {
  content: '*';
  color: var(--spk-checkbox-border-color-error);
}
`;
