import { ComponentProps } from "react";
import React, { useState } from 'react';

type ButtonProps = ComponentProps<"button">;

export const Button = ({ ...props}: ButtonProps) => {
  return (
  <button className="text-blue-500">Button</button>
);
};