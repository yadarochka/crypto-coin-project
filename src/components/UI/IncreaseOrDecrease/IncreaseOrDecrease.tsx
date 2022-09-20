import classNames from "classnames";

import React, { FC } from "react";

import styles from "./IncreaseOrDecrease.module.scss";

type IncreaseOrDecreaseProps = {
  number?: number | string;
  percent?: number;
  className?: string;
};

export const IncreaseOrDecrease: FC<IncreaseOrDecreaseProps> = ({
  percent,
  number,
  className,
}) => {
  if (percent) {
    number = percent;
  }
  if (!!number) {
    return (
      <div
        className={classNames(
          styles["inline-block"],
          Number(number) === 0 && styles.gray,
          Number(number) > 0 ? styles.green : styles.red,
          className
        )}
      >
        {number}
        {percent ? "%" : ""}
      </div>
    );
  }
  return null;
};
