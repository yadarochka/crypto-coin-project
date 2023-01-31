import { ThemeContext } from "app/providers/ThemeProvider";
import { themes } from "app/providers/ThemeProvider/ThemeContext";
import classnames from "classnames";

import React, { useContext } from "react";

import styles from "./Toggle.module.scss";

export default function Toggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div onClick={toggleTheme} className={classnames(styles.toggle)}>
      <div
        className={classnames(styles.circle, {
          [styles.active]: theme === themes.dark,
        })}
      />
    </div>
  );
}
