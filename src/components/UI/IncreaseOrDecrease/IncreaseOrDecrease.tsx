import classNames from "classnames";

import React, { FC } from "react";

import styles from "./IncreaseOrDecrease.module.scss";

type IncreaseOrDecreaseProps = {
  number: number;
  percent?: boolean;
  className?: string;
};

export const IncreaseOrDecrease: FC<IncreaseOrDecreaseProps> = ({
  percent = false,
  number,
  className,
}) => {
  const colorStyle = number > 0 ? styles.green : styles.red;
  return (
    <div className={classNames(colorStyle, className, styles.container)}>
      {number}
      {percent && "%"}
    </div>
  );
};
