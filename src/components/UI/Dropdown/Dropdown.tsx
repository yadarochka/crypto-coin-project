import classNames from "classnames";

import React, { memo, useCallback, useMemo } from "react";
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

  const toggleList = () => {
    setIsVisible(!isVisible);
  };

  const itemOnClick = (el: Option) => {
    onChange(el);
    toggleList();
  };

  const items = Object.values(options).map((el) => {
    return (
      <div
        key={el.key}
        className={classNames(
          styles["dropdown__item"],
          el.key === value.key ? styles["active"] : ""
        )}
        onClick={() => itemOnClick(el)}
      >
        {el.value}
      </div>
    );
  });

  return (
    <div className={classNames(styles.dropdown, className)}>
      <div
        className={classNames(styles["dropdown__value"])}
        onClick={toggleList}
      >
        {value.value}
      </div>
      <div className={classNames(styles["dropdown__options"])}>
        {isVisible && !disabled && items}
      </div>
    </div>
  );
};
export default memo(Dropdown);
