import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
  }

  .icon {
    display: block;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    -webkit-mask-size: contain;
    -webkit-mask-position: center; 
    -webkit-mask-repeat: no-repeat; 
    mask-size: contain; 
    mask-position: center; 
    mask-repeat: no-repeat;
    width: 1em;
    height: 1em;
    font-size: inherit;
  }

  /* Primary */
  .icon--primary {
    background-color: var(--spk-icon-color-primary);
  }

  /* Secondary */
  .icon--secondary {
    background-color: var(--spk-icon-color-secondary);
  }

   /* Secondary */
   .icon--tertiary {
    background-color: var(--spk-icon-color-tertiary);
  }

  /* Raw */
  .icon--raw {
    -webkit-mask-image: unset;
    mask-image: unset;
  }

  /* Sizes */
  
  .icon--s {
    font-size: var(--spk-icon-size-s);
  }

  .icon--m {
    font-size: var(--spk-icon-size-m);
  }

  .icon--l {
    font-size: var(--spk-icon-size-l);
  }

  .icon--xl {
    font-size: var(--spk-icon-size-xl);
  }

  /* Icon Images */

  .icon[name="loading"] {
    background-image: var(--spk-icon-svg-rotate);
    -webkit-mask-image: var(--spk-icon-svg-rotate);
    mask-image: var(--spk-icon-svg-rotate);
  }

  .icon[name="button-loading"] {
    background-image: var(--spk-icon-svg-spinner);
    -webkit-mask-image: var(--spk-icon-svg-spinner);
    mask-image: var(--spk-icon-svg-spinner);
  }

  .icon[name="home"] {
    background-image: var(--spk-icon-svg-home);
    -webkit-mask-image: var(--spk-icon-svg-home);
    mask-image: var(--spk-icon-svg-home);
  }

  .icon[name="check"] {
    background-image: var(--spk-icon-svg-check);
    -webkit-mask-image: var(--spk-icon-svg-check);
    mask-image: var(--spk-icon-svg-check);
  }

  /** 
   * This should be always at the last since 
   *   this will enable us to use "mask-image" and "background-color" 
   *   to apply color in the icon
   */
  .icon:not(.icon--raw) {
    background-image: none;
  }
`;
