import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { StoryAttributes } from '../../internal/storybook-additional';
import type RadioGroup from './radio-group';

type Story = StoryObj<StoryAttributes<RadioGroup>>;

function storySize(sizeVal: RadioGroup['size']): Story {
  return {
    args: {
      size: sizeVal,
      value: 'item1',
    },
    parameters: {
      docs: {
        source: {
          code: `
          <spk-radio-group size="${sizeVal}">
            <spk-radio value="item1">Radio Item</spk-radio>
            <spk-radio value="item1">Radio Item</spk-radio>
          </spk-radio-group>`,
        },
      },
      controls: { include: ['size'] },
    },
    render: ({ size, value }) => html`
    <div>
        <spk-radio-group size="${size}" value=${value}>
          <spk-radio value="item1">Radio item 1</spk-radio>
          <spk-radio value="item2">Radio item 1</spk-radio>
        </spk-radio-group>
    </div>
  `,
  };
}

export default {
  title: 'Components/Radio',
  component: 'spk-radio-group',
  args: {
    size: 's',
    name: '',
    id: '',
    disabled: false,
    required: false,
    label: 'This is Radio Group label',
  },
  render: ({
    value = 'item1',
    label = 'This is Radio Group label',
    helperText = 'This is helper text',
    size = 's',
    id = '',
    name = '',
    disabled = false,
    required = false,
  }) => html` 
    <spk-radio-group
      value="${value}" 
      label="${label}" 
      helpertext="${helperText}" 
      size="${size}" 
      ?required="${required}"
    >
      <spk-radio
        label="Radio item 1"
        value="item1"
        id="${id}" 
        name="${name}" 
        ?disabled="${disabled}">
          Radio item 1
      </spk-radio>
      <spk-radio label="Radio item 2" value="item2">Radio item 2</spk-radio>
    </spk-radio-group>
  `,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['s', 'l'],
    },
  },
} satisfies Meta<StoryAttributes<RadioGroup>>;

/**
 * All available attributes
 */
export const AllControls: Story = {
  args: {
    name: '',
    helperText: 'Helper text',
    id: '',
    value: '',
    size: 's',
    label: 'This is Radio Group label',
    disabled: false,
    required: false,
  },
};

export const Small = storySize('s');

export const Large = storySize('l');

export const Checked: Story = {
  args: {
    size: 's',
    value: 'item1',
    label: 'To set the initial value and checked state, use the value attribute on the containing radio group.',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['s', 'l'],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
        /* To set the initial value and checked state, use the value attribute on the containing radio group. */
        <spk-radio-group size="s" value="item1">
          <spk-radio value="item1">This is checked radio item</spk-radio>
        </spk-radio-group>`,
      },
    },
    controls: { include: ['size'] },
  },
  render: ({
    label,
    size,
    value,
  }) => html` 
    <spk-radio-group label=${label} size=${size} value=${value}>
      <spk-radio value="item1">This is checked radio item</spk-radio>
    </spk-radio-group>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    size: 's',
    value: 'item1',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    size: {
      control: 'radio',
      options: ['s', 'l'],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
        <spk-radio-group>
          <spk-radio value="item1" disable>Disabled Radio item</spk-radio>
        </spk-radio-group>
        `,
      },
    },
    controls: { include: ['size', 'disabled'] },
  },
  render: ({
    size,
    value,
    disabled
  }) => html` 
    <spk-radio-group size=${size} value=${value}>
      <spk-radio value="item1">Radio item 1</spk-radio>
      <spk-radio value="item2" ?disabled="${disabled}">Disabled Radio item 2</spk-radio>
      <spk-radio value="item3" ?disabled="${disabled}">Disabled Radio item 3</spk-radio>
    </spk-radio-group>
  `,
};

export const Required: Story = {
  args: {
    required: true,
    size: 's',
    value: 'item1',
    label: 'this is required',
  },
  argTypes: {
    required: { control: 'boolean' },
    size: {
      control: 'radio',
      options: ['s', 'l'],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
        <spk-radio-group required>
          <spk-radio value="item1">Radio item 1</spk-radio>
          <spk-radio value="item2" >Radio item 2</spk-radio>
        </spk-radio-group>
        `,
      },
    },
    controls: { include: ['size', 'required'] },
  },
  render: ({
    size,
    value,
    required,
    label
  }) => html` 
    <spk-radio-group label=${label} size=${size} value=${value} ?required="${required}">
      <spk-radio value="item1">Radio item 1</spk-radio>
      <spk-radio value="item2" >Radio item 2</spk-radio>
    </spk-radio-group>
  `,
};

export const Error: Story = {
  args: {
    required: true,
    size: 'l',
    value: 'item2',
    label: 'this is error / waiting for form validation',
  },
  argTypes: {
    required: { control: 'boolean' },
    size: {
      control: 'radio',
      options: ['s', 'l'],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
        <spk-radio-group>
          <spk-radio value="item1" error>Radio item 1</spk-radio>
          <spk-radio value="item2">Radio item 2</spk-radio>
        </spk-radio-group>
        `,
      },
    },
    controls: { include: ['size'] },
  },
  render: ({
    size,
    value,
    label
  }) => html` 
    <spk-radio-group label=${label} size=${size} value=${value}>
      <spk-radio value="item1" error>Radio item 1</spk-radio>
      <spk-radio value="item2">Radio item 2</spk-radio>
    </spk-radio-group>
  `,
};
