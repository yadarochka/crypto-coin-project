import React from "react";
import { FC, useState } from "react";

import styles from "./Dropdown.module.scss";
import { MultiDropdownProps, Option } from "./types";

export const Dropdown: FC<MultiDropdownProps> = ({
  options = [],
  onChange,
  value = { key: "", value: "" },
  disabled,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const itemOnClick = (el: Option) => {
    onChange(el);
    toggleList();
  };

  const items = Object.values(options).map((el) => {
    return (
      <div
        key={el.key}
        className={styles["dropdown__item"]}
        onClick={() => itemOnClick(el)}
      >
        {el.value}
      </div>
    );
  });

  const toggleList = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`${styles["dropdown"]} ${className}`}>
      <div className={styles["dropdown__value"]} onClick={toggleList}>
        {value.value}
      </div>
      {isVisible && !disabled && items}
    </div>
  );
};
export default Dropdown;
