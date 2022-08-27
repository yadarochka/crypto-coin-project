import { useState } from "react";

import styles from "./Dropdown.module.scss";

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options?: string[];
  /** Текущие выбранные значения поля, массив может быть пустым */
  value?: string;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: string) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions?: (value: string) => string;

  className?: string;
};

export const Dropdown = ({
  options = ["item 1", "item 2", "item 3"],
  onChange,
  value = "item 1",
  disabled,
  pluralizeOptions = () => `${value}`,
  className,
}: MultiDropdownProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const itemOnClick = (el: string) => {
    onChange(el);
    toggleList();
  };

  const items = options.map((el) => {
    return (
      <div
        key={el}
        className={styles["dropdown__item"]}
        onClick={() => itemOnClick(el)}
      >
        {el}
      </div>
    );
  });

  const toggleList = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`${styles["dropdown"]} ${className}`}>
      <div className={styles["dropdown__value"]} onClick={toggleList}>
        {pluralizeOptions(value)}
      </div>
      {isVisible && !disabled && items}
    </div>
  );
};
export default Dropdown;
