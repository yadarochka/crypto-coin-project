import classNames from "classnames";

import React, { FC } from "react";

import styles from "./IncreaseOrDecrease.module.scss";

type IncreaseOrDecreaseProps = {
  number?: number | string;
  procent?: number;
  className?: string;
};

export const IncreaseOrDecrease: FC<IncreaseOrDecreaseProps> = ({
  procent,
  number,
  className,
}) => {
  if (procent) {
    number = procent;
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
        {procent ? "%" : ""}
      </div>
    );
  }
  return null;
};
