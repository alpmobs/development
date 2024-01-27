import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { StoryAttributes } from '../../internal/storybook-additional';
import type Loading from './loading';

type Story = StoryObj<StoryAttributes<Loading>>;

function storyColor(colorVal: Loading['color']): Story {
  return {
    args: {
      color: colorVal,
    },
    parameters: {
      docs: {
        source: {
          code: `<spk-loading size="l" color="${colorVal}"></spk-loading>`,
        },
      },
      controls: { include: ['color'] },
    },
    render: ({ color }) => html`
    <div>
        <spk-loading color="${color}" size="l"></spk-loading><br><br>
    </div>
  `,
  };
}

export default {
  title: 'Components/Loading',
  component: 'spk-loading',
  render: ({
    color = 'primary',
    variant = 'default',
    size = 'inherit',
    name = 'loading-name',
  }) => html` 
    <spk-loading name="${name}" color="${color}" size="${size}" variant="${variant}"></spk-loading> 
  `,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'button'],
    },
    color: {
      options: ['primary', 'secondary', 'tertiary', 'raw'],
    },
    size: {
      options: ['s', 'm', 'l', 'xl', 'inherit'],
    },
  },
} satisfies Meta<StoryAttributes<Loading>>;

export const AllControls: Story = {
  args: {
    color: 'primary',
    size: 'm',
  },
};

/** Available Sizes */
export const Primary = storyColor('primary');
export const Secondary = storyColor('secondary');
export const Tertiary = storyColor('tertiary');
export const Raw = storyColor('raw');

/**
 * A loading state that is defined by `size` attribute.
 *
 * Please refer to the Docs for all possible values
 */
export const Size: Story = {
  parameters: {
    docs: {
      source: {
        code: '<spk-loading size="m"></spk-loading>',
      },
    },
    controls: { include: ['size'] },
  },
  // we put a `size` here to be able to show only the size control
  render: () => html` 
    <div>
        <spk-loading size="s"></spk-loading><br>
        <spk-loading size="m"></spk-loading><br>
        <spk-loading size="l"></spk-loading><br>
        <spk-loading size="xl"></spk-loading><br>
    </div>
  `,
};

/**
 * A loading state that inherits the parent's font-size
 *
 * ```
 * <div style="font-size: 50px"> <!-- font-size: 50px is inherited by loading state -->
 *   <spk-loading size="inherit"></spk-loading>
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
        code: '<spk-loading size="inherit"></spk-loading>',
      },
    },
    controls: { include: ['size'] },
  },
  render: ({ size }) => html`
<div style="font-size: 80px">
  <spk-loading size="${size}"></spk-loading> 
</div>
  `,
};
