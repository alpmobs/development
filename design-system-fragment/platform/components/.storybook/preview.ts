import type { Preview } from "@storybook/web-components";
import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../dist/custom-elements.json';
import '../dist/spark.js'

/**
 * A temporary wrapper that ignores private members
 *  and methods from Custom Elements Manifest
 *
 * @TODO: Will remove this once the issue is implemented, see details below.
 * https://github.com/storybookjs/storybook/issues/15436#issuecomment-1272769983
 */
const setCustomElementsManifestWithOptions = (
  customElements: any,
  options: { privateFields?: boolean },
): void => {
  let { privateFields = true } = options;
  if (!privateFields) {
    customElements?.modules?.forEach((module: { declarations: any[] }) => {
      module?.declarations?.forEach(declaration => {
        Object.keys(declaration).forEach(key => {
          if (Array.isArray(declaration[key])) {
            declaration[key] = declaration[key].filter(
              (member: { privacy: string | string[] }) =>
                !member.privacy?.includes('private'),
            );
          }
        });
      });
    });
  }
  return setCustomElementsManifest(customElements);
};

setCustomElementsManifestWithOptions(customElements, { privateFields: false });

const preview: Preview = {
  argTypes: {
    size: {
      options: ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', 'inherit'],
    }
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        options: /(color)$/i,
        date: /Date$/,
      },
      expanded: true,
      sort: 'requiredFirst'
    },
    options: {
      storySort: {
        order: ["Getting Started", "*", "Design Tokens"],
      },
    },
    themes: {
      default: 'verajohn_jp',
      brands: [
        { name: 'verajohn_com', label: 'Vera & John (PLNG)', css: 'verajohn_com.css', indicator: 'vj_logo.png', useIconOnIndicator: true },
        { name: 'verajohn_se', label: 'Vera & John (SE)', css: 'verajohn_se.css', indicator: 'vj_logo.png', useIconOnIndicator: true },
        { name: 'verajohn_jp', label: 'Vera & John (RDGE)', css: 'verajohn_jp.css', indicator: 'vj_logo.png', useIconOnIndicator: true },
        { name: 'yuugado_com', label: 'Yuugado', css: 'yuugado_com.css', indicator: 'yuugado.png', useIconOnIndicator: true },
        { name: 'intercasino_com', label: 'Intercasino (PLNG)', css: 'intercasino_com.css', indicator: 'ic_plng.png', useIconOnIndicator: true },
        { name: 'intercasino_se', label: 'Intercasino (SE)', css: 'intercasino_se.css', indicator: 'ic_se.png', useIconOnIndicator: true },
        { name: 'intercasino_jp', label: 'Intercasino (JP)', css: 'intercasino_jp.css', indicator: 'ic_rdge.png', useIconOnIndicator: true },
        { name: 'livecasinohouse_com', label: 'Live Casino House (AFUN)', css: 'livecasinohouse_com.css', indicator: 'lch.png', useIconOnIndicator: true },
        { name: 'happyluke_com', label: 'Happy Luke (AFUN)', css: 'happyluke_com.css', indicator: 'hl-logo.png', useIconOnIndicator: true },
        { name: 'boabet', label: 'BoaBet', css: 'boabet.css', indicator: '#3b870a' },
      ],
    }
  }
}

export default preview;
