import { Loader, LoaderSize } from "shared/components/Loader";

import React, { FC } from "react";

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
