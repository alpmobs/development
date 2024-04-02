import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { StoryAttributes } from '../../internal/storybook-additional';
import type Link from './link';

type Story = StoryObj<StoryAttributes<Link>>;

function storyColor(colorVal: Link['color']): Story {
  return {
    args: {
      color: colorVal,
    },
    parameters: {
      pseudo: {
        hover: '#hover',
        active: '#active',
        visited: '#visited',
      },
      docs: {
        source: {
          code: `<spk-link color="${colorVal}">Link</spk-link>`,
        },
      },
      controls: { include: ['color'] },
    },
    render: ({ color }) => html`
    <div>
        <spk-link id="default" color="${color}">Default</spk-link><br><br>
        <spk-link id="hover" color="${color}">Hover</spk-link><br><br>
        <spk-link id="active" color="${color}">Active</spk-link><br><br>
        <spk-link id="visited" color="${color}">Visited</spk-link>
    </div>
  `,
  };
}

export default {
  title: 'Components/Link',
  component: 'spk-link',
  render: ({
    href,
    target,
    rel,
    label = 'Link',
    color = 'primary',
    size = 'inherit',
  }) => html` 
    <spk-link color="${color}" href="${href}" rel="${rel}" target="${target}" size="${size}">${label}</spk-link> 
  `,
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: ['primary', 'secondary'],
    },
    target: {
      control: 'radio',
      options: ['_blank', '_self', '_top', '_parent'],
    },
    link: { table: { disable: true } },
  },
} satisfies Meta<StoryAttributes<Link>>;

export const AllControls: Story = {
  args: {
    color: 'primary',
    size: 's',
    href: '/your-url-here',
    target: '_blank',
    rel: 'nofollow',
    label: 'Link',
  },
};

export const Primary = storyColor('primary');

export const Secondary = storyColor('secondary');

/**
 * A link that is defined by `size` attribute.
 *
 * Please refer to the Docs for all possible values
 */
export const Size: Story = {
  args: {
    // this is used in `render` function below
    size: 'm',
  },
  argTypes: {
    size: {
      // don't show options as all the possible values of sizes are now displayed
      options: [],
    },
  },
  parameters: {
    docs: {
      source: {
        code: '<spk-link size="m">Link</spk-link>',
      },
    },
    controls: { include: ['size'] },
  },
  // we put a `size` here to be able to show only the size control
  render: ({ size }) => html` 
    <div>
        <spk-link size="3xs">3xs</spk-link><br>
        <spk-link size="2xs">2xs</spk-link><br>
        <spk-link size="xs">xs</spk-link><br>
        <spk-link size="s">s</spk-link><br>
        <spk-link size="${size}">m</spk-link><br>
        <spk-link size="l">l</spk-link><br>
        <spk-link size="xl">xl</spk-link><br>
        <spk-link size="2xl">2xl</spk-link><br>
        <spk-link size="3xl">3xl</spk-link><br>
    </div>
  `,
};

/**
 * A link that inherits the parent's font-size
 *
 * ```
 * <div style="font-size: 50px"> <!-- font-size: 50px is inherited by link -->
 *   <spk-link size="inherit">Link</spk-link>
 * </div>
 * ```
 */
export const SizeInherit: Story = {
  name: 'Size: Inherit',
  args: {
    size: 'inherit',
  },
  argTypes: {
    size: {
      options: ['inherit'],
    },
  },
  parameters: {
    docs: {
      source: {
        code: '<spk-link size="inherit">Inherit</spk-link>',
      },
    },
    controls: { include: ['size'] },
  },
  render: ({ size }) => html`
<div style="font-size: 50px">
  <spk-link size="${size}">Inherit</spk-link> 
</div>
  `,
};
