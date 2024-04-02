import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    cursor: pointer;
    display: inline-block;
  }
  
  .link {
    font-family: var(--spk-link-font-family);
    font-size: inherit;
    text-decoration: underline;
  }
  
  /* Primary */
  .link--primary,
  .link--primary:link {
    color: var(--spk-link-color-text-primary-default);
  }

  .link--primary:visited {
    color: var(--spk-link-color-text-primary-visited);
  }
  
  .link--primary:hover {
    color: var(--spk-link-color-text-primary-hover);
  }

  .link--primary:active {
    color: var(--spk-link-color-text-primary-active);
  }

  /* Secondary */
  .link--secondary,
  .link--secondary:link {
    color: var(--spk-link-color-text-secondary-default);
  }

  .link--secondary:visited {
    color: var(--spk-link-color-text-secondary-visited);
  }
  
  .link--secondary:hover {
    color: var(--spk-link-color-text-secondary-hover);
  }

  .link--secondary:active {
    color: var(--spk-link-color-text-secondary-active);
  }

  /* Sizes */
  .link--3xs {
    font-size: var(--spk-link-font-size-3xs);
  }

  .link--2xs {
    font-size: var(--spk-link-font-size-2xs);
  }

  .link--xs {
    font-size: var(--spk-link-font-size-xs);
  }

  .link--s {
    font-size: var(--spk-link-font-size-s);
  }

  .link--m {
    font-size: var(--spk-link-font-size-m);
  }

  .link--l {
    font-size: var(--spk-link-font-size-l);
  }

  .link--xl {
    font-size: var(--spk-link-font-size-xl);
  }

  .link--2xl {
    font-size: var(--spk-link-font-size-2xl);
  }

  .link--3xl {
    font-size: var(--spk-link-font-size-3xl);
  }
`;
