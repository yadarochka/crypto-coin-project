import classNames from "classnames";

import React, { FC } from "react";

import { Option } from "../Dropdown";
import styles from "./TabBar.module.scss";

type TabBarProps = {
  options: Option[];
  value: Option;
  onChange: (value: Option) => void;
};

export const TabBar: FC<TabBarProps> = ({ options, value, onChange }) => {
  const handleTabChange = (option: any) => {
    onChange(option);
  };
  return (
    <div className={styles.tab}>
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
