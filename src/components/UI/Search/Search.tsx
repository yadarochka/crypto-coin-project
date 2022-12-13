import React, { memo, useEffect } from "react";

import { useKeyboardEvent } from "utils/useKeyboardEvent";

import Button from "components/UI/Button";

import searchIcon from "images/search-icon.svg";

import styles from "./Search.module.scss";

type SearchProps = {
  /** Css-класс компонента Search */
  className?: string;
  /** Функция OnChange у input */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder у input */
  placeholder?: string;
  /** Value у input */
  value?: string;
  /** Текст у button */
  buttonText?: string;
  /** Функция OnClick у button */
  buttonOnClick: () => void;
  disabled: boolean;
};

const Search = ({
  className,
  onChange,
  placeholder,
  buttonText,
  buttonOnClick,
  value,
  disabled,
}: SearchProps) => {
  useKeyboardEvent("Enter", buttonOnClick, "search");

  return (
    <div className={className} id="search">
      <div className={styles.search}>
        <input
          value={value}
          onChange={onChange}
          className={styles["search__field"]}
          placeholder={placeholder}
          disabled={disabled}
        />
        <img src={searchIcon} alt="" className={styles["search__icon"]} />
      </div>
      <Button disabled={disabled} onClick={buttonOnClick} value={buttonText} />
    </div>
  );
};
export default memo(Search);
