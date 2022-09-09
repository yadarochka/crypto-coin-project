import React from "react";
import { FC } from "react";

import styles from "./Loader.module.scss";

type LoaderProps = {
  /**
   * Идет ли загрузка.
   * По умолчанию - true, для удобства использования
   * Если false, то лоадер не должен отображаться
   */
  loading?: boolean;
  /**
   * Размер лоадера. При передаче данного пропса, должен добавляться css-класс loader_size-{size}
   * По умолчанию: размер - LoaderSize.m, css-класс - loader_size-m
   */
  /**
   * Дополнительные CSS-классы.
   */
  className?: string;

  children?: React.ReactNode;
};

export const Loader: FC<LoaderProps> = ({ loading = true }) => {
  if (!loading) return null;
  else return <div className={styles.loader} />;
};
export default Loader;
