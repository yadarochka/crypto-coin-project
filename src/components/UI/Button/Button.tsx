import React from "react";
import { FC } from "react";

import styles from "./Button.module.scss";

type ButtonProps = React.PropsWithChildren<{}> &
  React.InputHTMLAttributes<HTMLInputElement> & {};

const Button: FC<ButtonProps> = ({ value, className, ...otherProps }) => {
  return (
    <input
      type="button"
      {...otherProps}
      value={value}
      className={`${styles["button"]} ${className}`}
    />
  );
};

export default Button;
