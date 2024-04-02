import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { StoryAttributes } from '../../internal/storybook-additional';
import type Button from './button';

type Story = StoryObj<StoryAttributes<Button>>;

function colorStory(colorVal: Button['color']): Story {
  return {
    parameters: {
      pseudo: {
        hover: '#hover',
        active: '#active',
      },
      docs: {
        source: {
          code: `<spk-button color="${colorVal}">Button</spk-button>`,
        },
      },
      controls: { include: ['color'] },
    },
    args: {
      color: colorVal,
    },
    render: ({ color }) => html`
    <div>
        <spk-button id="default" color="${color}">Default</spk-button>
        <spk-button id="hover" color="${color}">Hover</spk-button>
        <spk-button id="active" color="${color}">Active</spk-button>
        <spk-button id="disabled" color="${color}" disabled>Disabled</spk-button>
    </div>
  `,
  };
}

export default {
  title: 'Components/Button',
  component: 'spk-button',
  render: ({
    href,
    rel,
    name,
    target,
    title,
    label = 'Primary Button',
    type = 'button',
    value = 'Primary Button',
    color = 'primary',
    size = 'l',
    loading = false,
    fullwidth = false,
    disabled = false,
  }) => html`
    <spk-button
      href="${href}"
      rel="${rel}"
      name="${name}"
      target="${target}"
      title="${title}"
      type="${type}"
      value="${value}"
      color="${color}"
      size="${size}"
      ?loading="${loading}"
      ?fullwidth="${fullwidth}"
      ?disabled="${disabled}"
    >${label}</spk-button>
  `,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['s', 'm', 'l'],
    },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset'],
    },
    target: {
      control: 'radio',
      options: ['_blank', '_self', '_top', '_parent'],
    },
    button: { table: { disable: true } },
  },
} satisfies Meta<StoryAttributes<Button>>;

/**
 * All available attributes
 */
export const AllControls: Story = {
  args: {
    color: 'primary',
    size: 'l',
    loading: false,
    fullwidth: false,
    disabled: false,
    type: 'button',
    name: 'primary-button',
    href: '/your-url-here',
    target: '_blank',
    rel: 'noreferrer',
    title: 'Im a button',
    value: 'primary button',
    label: 'Primary Button',
  },
};

export const Primary = colorStory('primary');

export const Secondary = colorStory('secondary');

export const Tertiary = colorStory('tertiary');

export const Size: Story = {
  args: {
    size: 'l',
  },
  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
    },
  },
  parameters: {
    docs: {
      source: {
        code: '<spk-button size="l">Large</spk-button>',
      },
    },
    controls: { include: ['size'] },
  },
  render: ({ size }) => html` 
    <div>
        <spk-button size="s">Small</spk-button>
        <spk-button size="m">Medium</spk-button>
        <spk-button size="${size}">Large</spk-button>
    </div>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      source: {
        code: '<spk-button disabled >Disabled</spk-button>',
      },
    },
    controls: { include: ['disabled'] },
  },
  render: ({ disabled }) => html` 
    <div>
        <spk-button>Default</spk-button>
        <spk-button ?disabled="${disabled}" >Disabled</spk-button>
    </div>
    
  `,
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  argTypes: {
    loading: { control: 'boolean' },
  },
  parameters: {
    docs: {
      source: {
        code: '<spk-button loading >Loading</spk-button>',
      },
    },
    controls: { include: ['loading'] },
  },
  render: ({ loading }) => html` 
    <div>
        <spk-button color="primary" ?loading="${loading}" >Primary</spk-button>
        <spk-button color="secondary" ?loading="${loading}" >Secondary</spk-button>
        <spk-button color="tertiary" ?loading="${loading}" >Tertiary</spk-button>
    </div>
    
  `,
};
/**
 * Button like link
 *
 * This is the actual rendered DOM inside shadow-root
 * ```
 * <a class="button button--primary button--l" href="/your-url-here" rel="noreferrer" target="_blank" title="" aria-disabled="false" tabindex="0">
 *    <slot></slot>
 * </a>
 * ```
 */
export const ButtonLink: Story = {
  args: {
    href: '/your-url-here',
    target: '_blank',
    rel: 'noreferrer',
  },
  parameters: {
    controls: { include: ['href', 'target', 'rel'] },
  },
  render: ({
    href,
    rel,
    target,
  }) => html`
    <spk-button href="${href}" rel="${rel}" target="${target}">Button as a Link</spk-button>
  `,
};
