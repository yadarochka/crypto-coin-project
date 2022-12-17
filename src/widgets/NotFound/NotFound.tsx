import React from "react";

import styles from "./NotFound.module.scss";

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image} />
      <div className={styles.message}>Not Found :(</div>
    </div>
  );
};
