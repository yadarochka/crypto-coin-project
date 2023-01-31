import { ThemeContext } from "app/providers/ThemeProvider";
import classNames from "classnames";

import React, { useContext } from "react";

import styles from "./NotFound.module.scss";

export const NotFound = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={classNames(styles.container, styles[theme])}>
      <div className={styles.image} />
      <div className={styles.message}>Not Found :(</div>
    </div>
  );
};
