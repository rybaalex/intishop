import React from "react";

export interface ButtonI {
  children?: string | React.ReactElement | React.ReactNode;
  type?: "submit" | "button" | "reset";
  textAlign?: "left" | "right" | "justify" | "center";
  customClass?:string,
  disabled?: boolean;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: "primary" | "black" | "link" | "auth";
  theme?: "chips" | "square" | "auth";
  link?: string;
}
