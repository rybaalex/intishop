import React, { ReactNode } from "react";

interface IInputProps {
  type?: "text" | "file" | "hidden" | "submit" | "password" | "number"|string;
  name: string;
  iconLabel?: ReactNode;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  /*labelPoosition: "inner" | "outer";*/
  action?: "success" | "error" | undefined;
  value?: string;
  theme?: "primary" | "search";
  onFocus?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export { IInputProps };
