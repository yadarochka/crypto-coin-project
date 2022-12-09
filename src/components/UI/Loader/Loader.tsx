import classNames from "classnames";

import React from "react";
import { FC } from "react";

import styles from "./Loader.module.scss";

export type LoaderSize = "s" | "m" | "l";

type LoaderProps = {
  className?: string;
  size?: "s" | "m" | "l";
};

function getLoaderSize(size: LoaderSize) {
  let loaderSizeInPx;
  switch (size) {
    case "s": {
      loaderSizeInPx = "16px";
      break;
    }
    case "m": {
      loaderSizeInPx = "32px";
      break;
    }
    case "l": {
      loaderSizeInPx = "64px";
      break;
    }
  }
  return {
    height: loaderSizeInPx,
    width: loaderSizeInPx,
  };
}

export const Loader: FC<LoaderProps> = ({ className, size = "m" }) => {
  const style = getLoaderSize(size);
  return <span className={styles.loader} style={style} />;
};
