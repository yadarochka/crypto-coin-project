import { memo } from "react";

import Button from "@components/UI/Button";
import searchIcon from "@images/search-icon.svg";

import styles from "./Search.module.scss";

type SearchProps = {
  /** Тип input */
  type: string;
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
  buttonOnClick?: () => void;
};

const Search = memo(
  ({
    className,
    onChange,
    placeholder = "Enter the text",
    type,
    buttonText = "Input button",
    buttonOnClick,
    value,
  }: SearchProps) => {
    return (
      <div className={className}>
        <div className={styles["search"]}>
          <input
            value={value}
            onChange={onChange}
            type={type}
            className={styles["search__field"]}
            placeholder={placeholder}
          />
          <img src={searchIcon} alt="" className={styles["search__icon"]} />
        </div>
        <Button onClick={buttonOnClick}>{buttonText}</Button>
      </div>
    );
  }
);
export default Search;
