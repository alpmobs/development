import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { StoryAttributes } from '../../internal/storybook-additional';
import type { TemplateResult } from 'lit';
import type Text from './text';

type Story = StoryObj<StoryAttributes<Text>>;

interface Attributes {
  label: StoryAttributes<Text>['label'];
  type: Text['type'];
  color: Text['color'];
  size: Text['size'];
  fontFamily: Text['fontFamily'];
  truncated: Text['truncated'];
  variant: Text['variant'];
}

function constructSpkText({
  label,
  type,
  color,
  size,
  fontFamily,
  truncated,
  variant,
}: Attributes): TemplateResult {
  return html`<spk-text 
    type="${type}"
    size="${size}"
    color="${color}"
    variant="${variant}" 
    fontfamily="${fontFamily}" 
    ?truncated="${truncated}"
  >${label}</spk-text>`;
}

function colorTypeStory(type: Text['type'], label: string): Story {
  return {
    parameters: {
      controls: { exclude: ['type'] },
      docs: {
        source: {
          code: `<spk-text type="${type}">${label}</spk-text>`,
        },
      },
    },
    render: ({
      size,
      color,
      fontFamily,
      truncated,
      variant,
    }) => constructSpkText({
      label,
      type,
      color,
      size,
      fontFamily,
      truncated,
      variant,
    }),
  };
}

export default {
  title: 'Components/Text',
  component: 'spk-text',
  args: {
    type: 'p',
    color: 'initial',
    size: 'initial',
    fontFamily: 'initial',
    variant: 'initial',
    truncated: false,
  },
  render: ({
    type = 'p',
    label = 'Text Component with all attributes',
    color = 'initial',
    size = 'initial',
    fontFamily = 'initial',
    variant = 'initial',
    truncated = false,
  }) => html`
<div style="${truncated ? 'width: 150px' : nothing}">
  ${constructSpkText({
    label,
    type,
    color,
    size,
    fontFamily,
    truncated,
    variant,
  })}
</div>
  `,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['initial', 'primary', 'secondary', 'label', 'neutral', 'subdued', 'contrast',
        'emphasize-primary', 'emphasize-secondary'],
    },
    fontFamily: {
      control: 'radio',
      options: ['initial', 'primary', 'secondary'],
    },
    variant: {
      control: 'select',
      options: ['initial', 'regular', 'underline', 'italic', 'bold', 'bold-italic', 'bold-underline'],
    },
    type: {
      control: 'select',
      options: ['initial', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label'],
    },
    size: {
      control: 'select',
      options: ['initial', 'display-1', 'display-2', 'display-3', 'display-4',
        'body-1', 'body-2', 'body-3', 'body-4', 'body-5',
        'small-1', 'small-2'],
    },
  },
} satisfies Meta<StoryAttributes<Text>>;

export const AllControls: Story = {};

export const Headings: Story = {
  parameters: {
    controls: { exclude: ['type'] },
    docs: {
      source: {
        code: '<spk-text type="h1">Heading 1</spk-text>',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['initial', 'display-1', 'display-2', 'display-3', 'display-4'],
    },
  },
  render: ({
    size,
    color,
    fontFamily,
    truncated,
    variant,
  }) => html`
<div style="${truncated ? 'width: 100px' : nothing}">
    ${[{ type: 'h1', label: 'Heading 1' },
      { type: 'h2', label: 'Heading 2' },
      { type: 'h3', label: 'Heading 3' },
      { type: 'h4', label: 'Heading 4' },
      { type: 'h5', label: 'Heading 5' },
      { type: 'h6', label: 'Heading 6' },
    ].map(({ type, label }) => {
      const attrValues = {
          label,
          type,
          color,
          size,
          fontFamily,
          truncated,
          variant,
      };
      return constructSpkText(attrValues as Attributes);
  })}
</div>
`,
};

export const Paragraph: Story = colorTypeStory('p', 'This is a Paragraph');

export const Span: Story = colorTypeStory('span', 'This is a Span');

export const Label: Story = colorTypeStory('label', 'This is a Label');

export const Sizes: Story = {
  args: {
    type: 'h2',
    size: 'display-1',
  },
  parameters: {
    controls: { exclude: ['type', 'size'] },
    docs: {
      source: {
        code: '<spk-text type="h1" size="display-1">`display-1` size is L for headings (`h1` to `h6`)</spk-text>',
      },
    },
  },
  render: ({
    type,
    size,
    color,
    fontFamily,
    truncated,
    variant,
  }) => html`
<div style="${truncated ? 'width: 100px' : nothing}">
  ${[{ newType: type, newSize: size, label: '`display-1` size is L for headings (`h1` to `h6`)' },
      { newType: 'h2', newSize: 'display-2', label: '`display-2` size is XL for headings (`h1` to `h6`)' },
      { newType: 'h2', newSize: 'display-3', label: '`display-3` size is 2XL for headings (`h1` to `h6`)' },
      { newType: 'h2', newSize: 'display-4', label: '`display-4` size is 3XL for headings (`h1` to `h6`) ' },
      { newType: 'p', newSize: 'body-1', label: '`body-1` size is 3XS for paragraphs and articles (`p` or `span`)' },
      { newType: 'p', newSize: 'body-2', label: '`body-2` size is 2XS for paragraphs and articles (`p` or `span`)' },
      { newType: 'p', newSize: 'body-3', label: '`body-3` size is XS for paragraphs and articles (`p` or `span`)' },
      { newType: 'p', newSize: 'body-4', label: '`body-4` size is S for paragraphs and articles (`p` or `span`)' },
      { newType: 'p', newSize: 'body-5', label: '`body-5` size is M for paragraphs and articles (`p` or `span`)' },
      {
        newType: 'label',
        newSize: 'small-1',
        label: '`small-1` size is 3XS for small captions and texts (`span` or `label`)',
      },
      {
        newType: 'label',
        newSize: 'small-2',
        label: '`small-2` size is 2XS for small captions and texts (`span` or `label`)',
      },
  ].map(({ newType, newSize, label }) => {
      const attrValues = {
          label,
          type: newType,
          color,
          size: newSize,
          fontFamily,
          truncated,
          variant,
      };
      return html`${constructSpkText(attrValues as Attributes)}<div></div>`;
  })}
</div>
`,
};

export const Colors: Story = {
  args: {
    type: 'p',
    color: 'initial',
  },
  parameters: {
    controls: { exclude: ['color'] },
    docs: {
      source: {
        code: '<spk-text color="primary">Primary color text component</spk-text>',
      },
    },
  },
  render: ({
    type,
    color,
    size,
    fontFamily,
    truncated,
    variant,
  }) => html` 
<div style="${truncated ? 'width: 100px' : nothing}">
  ${[{ newColor: color, label: '`primary` color text component' },
      { newColor: 'secondary', label: '`secondary` color text component' },
      { newColor: 'label', label: '`label` color text component' },
      { newColor: 'neutral', label: '`neutral` color text component' },
      { newColor: 'success', label: '`success` color text component' },
      { newColor: 'error', label: '`error` color text component' },
      { newColor: 'warning', label: '`warning` color text component' },
      { newColor: 'subdued', label: '`subdued` color text component' },
      { newColor: 'contrast', label: '`contrast` color text component' },
      { newColor: 'emphasize-primary', label: '`emphasize-primary` color text component' },
      { newColor: 'emphasize-secondary', label: '`emphasize-secondary` color text component' },
  ].map(({ newColor, label }) => {
      const attrValues = {
          label,
          type,
          color: newColor,
          size,
          fontFamily,
          truncated,
          variant,
      };
      return constructSpkText(attrValues as Attributes);
  })}
</div>
`,
};

export const Variants: Story = {
  args: {
    variant: 'regular',
  },
  parameters: {
    controls: { exclude: ['variant'] },
    docs: {
      source: {
        code: '<spk-text variant="regular">Regular variant text component</spk-text>',
      },
    },
  },
  render: ({
    type,
    color,
    size,
    fontFamily,
    truncated,
    variant,
  }) => html`
      <div style="${truncated ? 'width: 100px' : nothing}">
  ${[{ newVariant: variant, label: '`regular` variant text component' },
      { newVariant: 'italic', label: '`italic` variant text component' },
      { newVariant: 'underline', label: '`underline` variant text component' },
      { newVariant: 'bold', label: '`bold` variant text component' },
      { newVariant: 'bold-underline', label: '`bold-underline` variant text component' },
      { newVariant: 'bold-italic', label: '`bold-italic` variant text component' },
  ].map(({ newVariant, label }) => {
      const attrValues = {
          label,
          type,
          color,
          size,
          fontFamily,
          truncated,
          variant: newVariant,
      };
      return constructSpkText(attrValues as Attributes);
  })}
`,
};

export const Truncated: Story = {
  parameters: {
    controls: { exclude: ['truncated'] },
    docs: {
      source: {
        code: '<spk-text truncated>This sample text is a demo for truncated text.</spk-text>',
      },
    },
  },
  render: () => html` 
<div style="max-width: 320px">
  <spk-text type="p" truncated>This sample text is a demo for truncated text.
  This sample text is a demo for truncated text.</spk-text>
</div>
`,
};
