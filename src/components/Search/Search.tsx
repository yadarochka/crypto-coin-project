import searchIcon from "../../../src/images/search-icon.svg";
import styles from "./Search.module.scss";

type Props = {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ className, onChange }: Props) => {
  return (
    <div className={className}>
      <div className={styles["search"]}>
        <input
          onChange={onChange}
          type="text"
          className={styles["search__field"]}
          placeholder="Search Cryptocurrency"
        />
        <img src={searchIcon} alt="" className={styles["search__icon"]} />
      </div>
      <button className={styles["button"]}>Cancel</button>
    </div>
  );
};

export default Search;
