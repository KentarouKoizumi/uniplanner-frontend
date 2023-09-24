import { Meta, StoryObj } from "@storybook/react";

import { CalenderForm } from "./CalenderForm";
import { useState } from "react";

const meta: Meta = {
  title: "Components/Form/CalenderForm",
  component: CalenderForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: ({ ...args }) => {
    const [selectedDate, setSelectedDate] = useState<string[]>([]);
    return (
      <meta.component
        {...args}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      ></meta.component>
    );
  },
};
