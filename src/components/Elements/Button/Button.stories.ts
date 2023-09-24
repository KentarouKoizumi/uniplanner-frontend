import { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonProps } from "./Button";

const meta: Meta = {
  title: "Components/Elements/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variants: "primary",
    children: "test",
  },
};
