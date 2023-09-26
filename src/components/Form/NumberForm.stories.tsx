import { Meta, StoryObj } from "@storybook/react";

import { NumberForm } from "./NumberForm";
import { useState } from "react";

const meta: Meta = {
  title: "Components/Form/NumberForm",
  component: NumberForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "label",
    description: "description",
    required: false,
  },
  render: (args) => {
    const [number, setNumber] = useState(0);
    return <NumberForm {...args} number={number} setNumber={setNumber} />;
  },
};
