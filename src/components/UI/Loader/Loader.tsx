import classNames from "classnames";

import React from "react";
import { FC } from "react";

import styles from "./Loader.module.scss";

type LoaderProps = {
  className?: string;
};

export const Loader: FC<LoaderProps> = ({ className }) => {
  return (
    <div className={classNames(styles["loader-wrapper"], className)}>
      <div className={classNames(styles.loader)} />
    </div>
  );
};
export default Loader;
