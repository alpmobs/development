import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { StoryAttributes } from '../../internal/storybook-additional';
import type List from './list';

type Story = StoryObj<StoryAttributes<List>>;

function storyColor(colorVal: List['color']): Story {
  return {
    args: {
      color: colorVal,
    },
    parameters: {
      docs: {
        source: {
          code: `<spk-list color="${colorVal}">
            <spk-list-item>Item</spk-list-item>
            <spk-list-item>Item</spk-list-item>
          </spk-list>`,
        },
      },
      controls: { include: ['color'] },
    },
    render: ({ color }) => html`
    <div>
        <spk-list color="${color}">
          <spk-list-item>Item</spk-list-item>
          <spk-list-item>Item</spk-list-item>
        </spk-list>
    </div>
  `,
  };
}

export default {
  title: 'Components/List',
  component: 'spk-list',
  render: ({
    type = 'ul',
    size = 'l',
    color = 'primary',
    variant = 'regular',
    position = 'inside',
    marker = 'disc',
  }) => html`
    <spk-list
      type="${type}"
      size="${size}"
      color="${color}"
      variant="${variant}"
      position="${position}"
      marker="${marker}"
    >
      <spk-list-item>Item</spk-list-item>
      <spk-list-item>Item</spk-list-item>
      <spk-list-item>Item</spk-list-item>
      <spk-list-item>Item</spk-list-item>
    </spk-list>
  `,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['ul', 'ol', 'dl'],
    },
    color: {
      options: ['primary', 'secondary', 'contrast'],
    },
    variant: {
      options: ['regular', 'bold', 'italic', 'underline', 'bold-italic', 'bold-underline'],
    },
    marker: {
      options: ['none', 'disc', 'circle', 'square', 'decimal',
        'decimal-leading-zero', 'lower-roman', 'upper-roman', 'lower-alpha', 'upper-alpha'],
    },
    position: {
      options: ['inside', 'outside'],
    },
    list: { table: { disable: true } },
  },
} satisfies Meta<StoryAttributes<List>>;

/**
 * All available attributes
 */
export const AllControls: Story = {
  args: {
    type: 'ul',
    size: 's',
    color: 'primary',
    position: 'inside',
    variant: 'regular',
    marker: 'disc',
  },
};

export const UndList: Story = {
  name: 'Unordered List',
  args: {
    marker: 'disc',
  },
  argTypes: {
    marker: {
      options: ['none', 'disc', 'circle', 'square'],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<spk-list type="ul">
            <spk-list-item>Item</spk-list-item>
            <spk-list-item>Item</spk-list-item>
        </spk-list>`,
      },
    },
    controls: { include: ['marker'] },
  },
  render: ({ marker }) => html`
<div>
    <spk-list type="ul" marker="${marker}">
          <spk-list-item>Item</spk-list-item>
          <spk-list-item>Item</spk-list-item>
    </spk-list>
</div>
  `,
};

export const OrdList: Story = {
  name: 'Ordered List',
  args: {
    marker: 'decimal',
  },
  argTypes: {
    marker: {
      options: ['none', 'decimal', 'decimal-leading-zero', 'lower-roman',
        'upper-roman', 'lower-alpha', 'upper-alpha'],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<spk-list type="ol">
            <spk-list-item>Item</spk-list-item>
            <spk-list-item>Item</spk-list-item>
        </spk-list>`,
      },
    },
    controls: { include: ['marker'] },
  },
  render: ({ marker }) => html`
<div>
    <spk-list type="ol" marker="${marker}">
          <spk-list-item>Item</spk-list-item>
          <spk-list-item>Item</spk-list-item>
    </spk-list>
</div>
  `,
};

export const DLList: Story = {
  name: 'Definition List',
  args: {
    type: 'dl',
  },
  argTypes: {
    type: {
      options: [],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<spk-list type="dl">
          <spk-list-item>This is DT Tag item</spk-list-item>
          <spk-list-item indent>- This is DD Tag item</spk-list-item>
        </spk-list>`,
      },
    },
    controls: { include: ['type'] },
  },
  render: ({ type }) => html`
<div>
  <spk-list type="${type}">
    <spk-list-item>This is DT Tag item</spk-list-item>
    <spk-list-item indent>- This is DD Tag item</spk-list-item> 
    <spk-list-item>This is DT Tag item</spk-list-item>
    <spk-list-item indent>- This is DD Tag item</spk-list-item> 
    <spk-list-item indent>- This is DD Tag item</spk-list-item> 
  </spk-list> 
</div>
  `,
};

export const Primary = storyColor('primary');

export const Secondary = storyColor('secondary');

export const Contrast = storyColor('contrast');

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
        code: '<spk-list size="m"><spk-list-item>m Item</spk-list-item></spk-list>',
      },
    },
    controls: { include: ['size'] },
  },
  // we put a `size` here to be able to show only the size control
  render: ({ size }) => html` 
    <div>
        <spk-list size="3xs">
          <spk-list-item>3xs Item</spk-list-item>
          <spk-list-item>3xs Item</spk-list-item>
        </spk-list><br>
        <spk-list size="2xs">
          <spk-list-item>2xs Item</spk-list-item>
          <spk-list-item>2xs Item</spk-list-item>
        </spk-list><br>
        <spk-list size="xs">
          <spk-list-item>xs Item</spk-list-item>
          <spk-list-item>xs Item</spk-list-item>
        </spk-list><br>
        <spk-list size="s">
          <spk-list-item>s Item</spk-list-item>
          <spk-list-item>s Item</spk-list-item>
        </spk-list><br>
        <spk-list size="${size}">
          <spk-list-item>m Item</spk-list-item>
          <spk-list-item>m Item</spk-list-item>
        </spk-list><br>
        <spk-list size="l">
          <spk-list-item>l Item</spk-list-item>
          <spk-list-item>l Item</spk-list-item>
        </spk-list><br>
        <spk-list size="xl">
          <spk-list-item>xl Item</spk-list-item>
          <spk-list-item>xl Item</spk-list-item>
        </spk-list><br>
        <spk-list size="2xl">
          <spk-list-item>2xl Item</spk-list-item>
          <spk-list-item>2xl Item</spk-list-item>
        </spk-list><br>
        <spk-list size="3xl">
          <spk-list-item>3xl Item</spk-list-item>
          <spk-list-item>3xl Item</spk-list-item>
        </spk-list><br>
    </div>
  `,
};

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
        code: '<spk-list size="inherit"><spk-list-item>Inherit size item</spk-list-item></spk-list>',
      },
    },
    controls: { include: ['size'] },
  },
  render: ({ size }) => html`
<div style="font-size: 50px">
  <spk-list size="${size}">
    <spk-list-item>Inherit size item</spk-list-item>
  </spk-list> 
</div>
  `,
};

export const Variant: Story = {
  args: {
    // this is used in `render` function below
    variant: 'bold',
  },
  argTypes: {
    variant: {
      // don't show options as all the possible values of variants are now displayed
      options: [],
    },
  },
  parameters: {
    docs: {
      source: {
        code: '<spk-list variant="bold"><spk-list-item>this is bold item</spk-list-item></spk-list>',
      },
    },
    controls: { include: ['variant'] },
  },
  // we put a `variant` here to be able to show only the variant control
  render: ({ variant }) => html` 
    <div>
        <spk-list variant="regular">
          <spk-list-item>Regular item</spk-list-item>
          <spk-list-item>Regular item</spk-list-item>
        </spk-list><br>
        <spk-list variant="${variant}">
          <spk-list-item>Bold item</spk-list-item>
          <spk-list-item>Bold item</spk-list-item>
        </spk-list><br>
        <spk-list variant="italic">
          <spk-list-item>Italic item</spk-list-item>
          <spk-list-item>Italic item</spk-list-item>
        </spk-list><br>
        <spk-list variant="underline">
          <spk-list-item>Underline item</spk-list-item>
          <spk-list-item>Underline item</spk-list-item>
        </spk-list><br>
        <spk-list variant="bold-italic">
          <spk-list-item>Bold-Italic item</spk-list-item>
          <spk-list-item>Bold-Italic item</spk-list-item>        
        </spk-list><br>
        <spk-list variant="bold-underline">
          <spk-list-item>Bold-Underline item</spk-list-item>
          <spk-list-item>Bold-Underline item</spk-list-item>        
        </spk-list><br>
    </div>
  `,
};

export const Marker: Story = {
  args: {
    // this is used in `render` function below
    marker: 'circle',
  },
  argTypes: {
    marker: {
      // don't show options as all the possible values of markers are now displayed
      options: [],
    },
  },
  parameters: {
    docs: {
      source: {
        code: '<spk-list type="ul" marker="circle"><spk-list-item>Circle item</spk-list-item></spk-list>',
      },
    },
    controls: { include: ['marker'] },
  },
  // we put a `marker` here to be able to show only the marker control
  render: ({ marker }) => html` 
    <div>
    <spk-list marker="none">
          <spk-list-item>None list-item marker</spk-list-item>
          <spk-list-item>None list-item marker</spk-list-item>
        </spk-list><br>
        <spk-list type="ul" marker="disc">
          <spk-list-item>Circle list-item marker</spk-list-item>
          <spk-list-item>Circle list-item marker</spk-list-item>
        </spk-list><br>
        <spk-list type="ul" marker="${marker}">
          <spk-list-item>Disc list-item marker</spk-list-item>
          <spk-list-item>Disc list-item marker</spk-list-item>
        </spk-list><br>
        <spk-list type="ul" marker="square">
          <spk-list-item>Square list-item marker</spk-list-item>
          <spk-list-item>Square list-item marker</spk-list-item>
        </spk-list><br>
        <spk-list type="ol" marker="decimal">
          <spk-list-item>Decimal list-item marker</spk-list-item>
          <spk-list-item>Decimal list-item marker</spk-list-item>
        </spk-list><br>
        <spk-list type="ol" marker="decimal-leading-zero">
          <spk-list-item>Decimal-leading-zero list-item marker</spk-list-item>
          <spk-list-item>Decimal-leading-zero list-item marker</spk-list-item>
        </spk-list><br>
        <spk-list type="ol" marker="lower-roman">
          <spk-list-item>Lower-roman list-item marker</spk-list-item>
          <spk-list-item>Lower-roman list-item marker</spk-list-item>
        </spk-list><br>
        <spk-list type="ol" marker="upper-roman">
          <spk-list-item>Upper-roman list-item marker</spk-list-item>
          <spk-list-item>Upper-roman list-item marker</spk-list-item>
        </spk-list><br>
        <spk-list type="ol" marker="lower-alpha">
          <spk-list-item>Lower-alpha list-item marker</spk-list-item>
          <spk-list-item>Lower-alpha list-item marker</spk-list-item>
        </spk-list><br>
        <spk-list type="ol" marker="upper-roman">
          <spk-list-item>Upper-alpha list-item marker</spk-list-item>
          <spk-list-item>Upper-alpha list-item marker</spk-list-item>
        </spk-list><br>
    </div>
  `,
};
