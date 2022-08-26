import { memo } from "react";

import Button from "@components/UI/Button";
import searchIcon from "@images/search-icon.svg";

import styles from "./Search.module.scss";

type SearchProps = {
  type: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  buttonText?: string;
};

const Search = memo(
  ({
    className,
    onChange,
    placeholder = "Enter the text",
    type,
    buttonText = "Input button",
  }: SearchProps) => {
    return (
      <div className={className}>
        <div className={styles["search"]}>
          <input
            onChange={onChange}
            type={type}
            className={styles["search__field"]}
            placeholder={placeholder}
          />
          <img src={searchIcon} alt="" className={styles["search__icon"]} />
        </div>
        <Button>{buttonText}</Button>
      </div>
    );
  }
);
export default Search;
