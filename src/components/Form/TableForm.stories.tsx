import { Meta, StoryObj } from "@storybook/react";

import { TableForm } from "./TableForm";
import { useState } from "react";

const meta: Meta = {
  title: "Components/Form/TableForm",
  component: TableForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    periods: 5,
    dates: [
      "2023-09-23",
      "2023-09-24",
      "2023-09-25",
      "2023-09-26",
      "2023-09-27",
      "2023-09-28",
      "2023-09-29",
      "2023-09-30",
      "2023-10-01",
      "2023-10-02",
      "2023-10-03",
      "2023-10-04",
      "2023-10-05",
      "2023-10-06",
      "2023-10-07",
      "2023-10-08",
      "2023-10-09",
      "2023-10-10",
      "2023-10-11",
      "2023-10-12",
      "2023-10-13",
      "2023-10-14",
      "2023-10-15",
      "2023-10-16",
      "2023-10-17",
      "2023-10-18",
      "2023-10-19",
      "2023-10-20",
      "2023-10-21",
      "2023-10-22",
      "2023-10-23",
      "2023-10-24",
      "2023-10-25",
      "2023-10-26",
      "2023-10-27",
      "2023-10-28",
      "2023-10-29",
      "2023-10-30",
      "2023-10-31",
      "2023-11-01",
      "2023-11-02",
      "2023-11-03",
      "2023-11-04",
      "2023-11-05",
      "2023-11-06",
      "2023-11-07",
      "2023-11-08",
      "2023-11-09",
      "2023-11-10",
      "2023-11-11",
    ],
    isWeekly: true,
  },
  render: ({ ...args }) => {
    const [selected, setSelected] = useState<any[]>([]);
    return (
      <meta.component
        {...args}
        selected={selected}
        setSelected={setSelected}
      ></meta.component>
    );
  },
};
