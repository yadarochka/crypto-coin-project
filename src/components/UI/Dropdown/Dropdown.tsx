import { FC, useState } from "react";

import styles from "./Dropdown.module.scss";
import { MultiDropdownProps, Options } from "./types";

export const Dropdown: FC<MultiDropdownProps> = ({
  options = [
    { key: "1", value: "item 1" },
    { key: "2", value: "item 2" },
    { key: "3", value: "item 3" },
  ],
  onChange,
  value = { key: "1", value: "item 1" },
  disabled,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const itemOnClick = (el: Options) => {
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
