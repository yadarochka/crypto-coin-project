import classNames from "classnames";

import React, { memo, useCallback, useMemo, useRef } from "react";
import { FC, useState } from "react";

import { useKeyboardEvent } from "utils/useKeyboardEvent";

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
  const targetRef = useRef<HTMLDivElement>(null);

  const itemOnClick = (el: Option) => {
    onChange(el);
    handleClick();
  };

  const handleOutsideClick = (event: any) => {
    if (targetRef.current) {
      if (targetRef.current.contains(event.target)) {
        return;
      }
      setIsVisible(false);
    }
  };
  const handleClick = () => {
    if (!isVisible) {
      document.addEventListener("click", handleOutsideClick, false);
    } else {
      document.removeEventListener("click", handleOutsideClick, false);
    }
    setIsVisible((prevState) => !prevState);
  };

  const items = Object.values(options).map((el) => {
    return (
      <button
        tabIndex={0}
        key={el.key}
        className={classNames(
          styles["dropdown__item"],
          el.key === value.key && styles["active"]
        )}
        onClick={() => itemOnClick(el)}
      >
        {el.value}
      </button>
    );
  });

  const dropdownId = Math.random();

  useKeyboardEvent("Enter", handleClick, `dropdown${dropdownId}`, [isVisible]);
  return (
    <div id="dropdown" className={classNames(styles.dropdown, className)}>
      <div
        id={`dropdown${dropdownId}`}
        tabIndex={0}
        ref={targetRef}
        className={classNames(styles["dropdown__value"])}
        onClick={handleClick}
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
