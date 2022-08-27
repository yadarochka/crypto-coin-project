import { useState } from "react";

import styles from "./Dropdown.module.scss";

export type Options = {
  key: string;
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options?: Options[];
  /** Текущие выбранные значения поля, массив может быть пустым */
  value?: Options;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Options) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions?: (value: string) => string;

  className?: string;
};

export const Dropdown = ({
  options = [
    { key: "1", value: "item 1" },
    { key: "2", value: "item 2" },
    { key: "3", value: "item 3" },
  ],
  onChange,
  value = { key: "1", value: "item 1" },
  disabled,
  pluralizeOptions = () => `${value}`,
  className,
}: MultiDropdownProps) => {
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
