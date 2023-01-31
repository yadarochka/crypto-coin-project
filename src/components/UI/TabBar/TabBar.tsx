import { ThemeContext } from "app/providers/ThemeProvider";
import classNames from "classnames";

import React, { FC, useContext } from "react";

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
  const { theme } = useContext(ThemeContext);
  const handleTabChange = (option: any) => {
    onChange(option);
  };
  return (
    <div className={classNames(styles.tab, className)}>
      {options.map((option) => (
        <div
          onClick={() => handleTabChange(option)}
          tabIndex={0}
          key={option.key}
          className={classNames(styles.item, styles[theme], {
            [styles.active]: option.value === value.value,
          })}
        >
          {option.value}
        </div>
      ))}
    </div>
  );
};
