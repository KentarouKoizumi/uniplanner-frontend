import { Meta, StoryObj } from "@storybook/react";

import { DateButton } from "./CalenderForm";

const meta: Meta = {
  title: "Components/Form/DateButton",
  component: DateButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    date: 10,
  },
};
