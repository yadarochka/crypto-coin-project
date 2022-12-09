import React, { FC } from "react";

import { Loader, LoaderSize } from "components/UI/Loader";

import styles from "./PageLoader.module.scss";

type PageLoaderProps = {
  loaderSize?: LoaderSize;
  className?: string;
};
export const PageLoader: FC<PageLoaderProps> = ({
  loaderSize = "l",
  className,
}) => {
  return (
    <div className={styles.wrapper}>
      <Loader size={loaderSize} className={className} />
    </div>
  );
};
