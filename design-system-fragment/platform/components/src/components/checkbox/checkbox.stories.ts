import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { StoryAttributes } from '../../internal/storybook-additional';
import type { TemplateResult } from 'lit';
import type Checkbox from './checkbox';

type CheckboxAdditionalAttribute = StoryAttributes<Checkbox> & { 'error': boolean };
type Story = StoryObj<CheckboxAdditionalAttribute>;
type Attributes = Partial<CheckboxAdditionalAttribute>;

function constructSpkCheckbox({
  label,
  name,
  value,
  size,
  checked,
  disabled,
  required,
  error
}: Attributes): TemplateResult {
  return html`<spk-checkbox 
    name="${name}"
    value="${value}" 
    size="${size}"
    ?checked="${checked}"
    ?disabled="${disabled}"
    ?required="${required}"
    ?data-user-invalid="${error}"
  >${label}</spk-checkbox>`;
}

export default {
  title: 'Components/Checkbox',
  component: 'spk-checkbox',
  args: {
    name: 'sampleName',
    value: 'sampleValue',
    size: 's',
    checked: false,
    disabled: false,
    required: false,
    error: false,
    label: 'Sample checkbox',
  },
  render: ({
    name = 'sampleName',
    value = 'sampleValue',
    size = 's',
    label = 'Sample checkbox',
    checked = false,
    disabled = false,
    required = false,
    error = false,
  }) => html` 
  ${constructSpkCheckbox({
    label,
    name,
    value,
    size,
    checked,
    disabled,
    required,
    error,
  })}
  `,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['s', 'l'],
    },
    label: { control: 'text', description: 'Enter your label text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    name: { control: 'text' },
    value: { control: 'text' },
  },
} satisfies Meta<CheckboxAdditionalAttribute>;

export const AllControls: Story = {};

export const Small: Story = {
  parameters: {
    controls: { exclude: ['size', 'checked', 'label'] },
    docs: {
      source: {
        code: '<spk-checkbox size="s">Small checkbox</spk-checkbox>',
      },
    },
  },
  render: ({
    name,
    value,
    disabled,
    required,
    error,
  }) => html` 
  ${[{ size: 's', label: 'Small checkbox', checked: false },
    { size: 's', label: 'Small checkbox', checked: true },
  ].map(({ size, label, checked }) => {
    const attrValues = {
        label,
        name,
        value,
        size,
        checked,
        disabled,
        required,
        error,
    };
    return constructSpkCheckbox(attrValues as Attributes);
})}
`,
};

export const Large: Story = {
  parameters: {
    controls: { exclude: ['size', 'checked', 'label'] },
    docs: {
      source: {
        code: '<spk-checkbox size="l">Large checkbox</spk-checkbox>',
      },
    },
  },
  render: ({
    name,
    value,
    disabled,
    required,
    error,
  }) => html` 
  ${[{ size: 'l', label: 'Large checkbox', checked: false },
    { size: 'l', label: 'Large checkbox', checked: true },
  ].map(({ size, label, checked }) => {
    const attrValues = {
        label,
        name,
        value,
        size,
        checked,
        disabled,
        required,
        error,
    };
    return constructSpkCheckbox(attrValues as Attributes);
})}
`,
};

export const Checked: Story = {
  parameters: {
    controls: { exclude: ['size', 'checked', 'label'] },
    docs: {
      source: {
        code: '<spk-checkbox checked>Checked checkbox</spk-checkbox>',
      },
    },
  },
  render: ({
    name,
    value,
    disabled,
    required,
    error,
  }) => html` 
  ${[{ size: 's', label: 'Checked - small checkbox', checked: true },
    { size: 'l', label: 'Checked - large checkbox', checked: true },
  ].map(({ size, label, checked }) => {
    const attrValues = {
        label,
        name,
        value,
        size,
        checked,
        disabled,
        required,
        error,
    };
    return constructSpkCheckbox(attrValues as Attributes);
})}
`,
};

export const Disabled: Story = {
  parameters: {
    controls: { exclude: ['size', 'disabled', 'label'] },
    docs: {
      source: {
        code: '<spk-checkbox disabled>Disabled checkbox</spk-checkbox>',
      },
    },
  },
  render: ({
    name,
    value,
    checked,
    required,
    error,
  }) => html` 
  ${[{ size: 's', label: 'Disabled - small checkbox', disabled: true },
    { size: 'l', label: 'Disabled - large checkbox', disabled: true },
  ].map(({ size, label, disabled }) => {
    const attrValues = {
        label,
        name,
        value,
        size,
        checked,
        disabled,
        required,
        error,
    };
    return constructSpkCheckbox(attrValues as Attributes);
})}
`,
};

export const Required: Story = {
  parameters: {
    controls: { exclude: ['size', 'required', 'label'] },
    docs: {
      source: {
        code: '<spk-checkbox required>Required checkbox</spk-checkbox>',
      },
    },
  },
  render: ({
    name,
    value,
    disabled,
    checked,
    error,
  }) => html` 
  ${[{ size: 's', label: 'Required - small checkbox', required: true },
    { size: 'l', label: 'Required - large checkbox', required: true },
  ].map(({ size, label, required }) => {
    const attrValues = {
        label,
        name,
        value,
        size,
        checked,
        disabled,
        required,
        error,
    };
    return constructSpkCheckbox(attrValues as Attributes);
})}
`,
};

export const Error: Story = {
  parameters: {
    controls: { exclude: ['size', 'error', 'label'] },
    docs: {
      source: {
        code: '<spk-checkbox error>Error checkbox</spk-checkbox>',
      },
    },
  },
  render: ({
    name,
    value,
    disabled,
    checked,
    required,
  }) => html` 
  ${[{ size: 's', label: 'Required - small checkbox', error: true },
    { size: 'l', label: 'Required - large checkbox', error: true },
  ].map(({ size, label, error }) => {
    const attrValues = {
        label,
        name,
        value,
        size,
        checked,
        disabled,
        required,
        error
    };
    return constructSpkCheckbox(attrValues as Attributes);
})}
`,
};
