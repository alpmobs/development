import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-pseudo-states",
    "@storybook/addon-mdx-gfm",
    "storybook-addon-spark-theme-switcher",

  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  /** @INFO: load build tokens file, so ThemeSwitcher can easily load the css of the selected brand
   * [@tokens, ...]
   */
  staticDirs: ['../../tokens/dist', '../../tokens/assets/common/images'],
};
export default config;
