import classNames from "classnames";

import React, { FC } from "react";

import { Option } from "../Dropdown";
import styles from "./TabBar.module.scss";

type TabBarProps = {
  className?: string;
  options: Option[];
  value: Option;
  onChange: (value: Option) => void;
};

export const TabBar: FC<TabBarProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  const handleTabChange = (option: any) => {
    onChange(option);
  };
  return (
    <div className={classNames(styles.tab, className)}>
      {options.map((option) => (
        <div
          onClick={() => handleTabChange(option)}
          key={option.key}
          className={classNames(
            styles["tab__item"],
            option.key === value.key ? styles.active : ""
          )}
        >
          {option.value}
        </div>
      ))}
    </div>
  );
};
