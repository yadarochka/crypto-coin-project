import { NotFound } from "widgets/NotFound";

import React from "react";

import styles from "./NotFoundPage.module.scss";

export const NotFoundPage = () => {
  return (
    <div className={styles["not-found"]}>
      <NotFound />
    </div>
  );
};
