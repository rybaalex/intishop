import { FC } from "react";
import { IInputProps } from "./Input.d";
import Styles from "./Input.module.scss";

const Input: FC<IInputProps> = ({
                                  name = "default",
                                  disabled = false,
                                  placeholder = "",
                                  className = "",
                                  theme = "primary",
                                  label = "",
                                  onChange,
                                  type,
                                  onBlur,
                                  onFocus,
                                  iconLabel = "",
                                  value = ""
                                }) => {
  return (
    <div className={`${Styles[`theme__${theme}`]}`}>
      <input
        className={`${className && Styles[className]
        }`}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        id={name}
        type={type}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        value={value}
      />
      <div className={Styles.label_block}>
        {iconLabel && iconLabel}
        {label && (
          <label htmlFor={name}>
            {label}
          </label>
        )}
      </div>
    </div>
  );
};
export { Input };
