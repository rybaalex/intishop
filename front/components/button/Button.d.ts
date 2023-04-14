import React from "react";

export interface ButtonI {
  children?: string | React.ReactElement | React.ReactNode;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: "white" | "black" | "link" | "auth";
  theme?: "chips" | "square" | "auth";
  link?: string;
}
