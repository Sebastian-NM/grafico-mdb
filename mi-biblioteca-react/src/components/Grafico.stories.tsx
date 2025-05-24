import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Grafico from "./Grafico";

const meta: Meta<typeof Grafico> = {
  title: "Componentes/Grafico",
  component: Grafico,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Grafico>;

export const PorDefecto: Story = {
  args: {},
};
