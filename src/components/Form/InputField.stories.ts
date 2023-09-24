import { Meta, StoryObj } from '@storybook/react';

import { InputField } from './InputField';

const meta: Meta = {
  title: 'Components/Form/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'text',
    placeholder: 'placeholder',
    label: 'label',
    description: 'description',
    required: false,
  }
}