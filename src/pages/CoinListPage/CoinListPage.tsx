import { useState, useEffect } from "react";

import Dropdown from "@components/UI/Dropdown";
import Loader from "@components/UI/Loader";
import Search from "@components/UI/Search";
import useDropdown from "@hooks/useDropdown";
import useSearchInput from "@hooks/useSearchInput";
import { Coin } from "@type/CoinType";
import axios from "axios";
import classNames from "classnames";

import styles from "./CoinListPage.module.scss";
import CoinList from "./components/CoinList";

const CoinListPage = () => {
  const { search, handleInput, handlerSearchButton } = useSearchInput();

  const [coins, setCoins] = useState<Coin[]>([]);

  const [coinInfoIsLoading, setCoinInfoIsLoading] = useState(false);

  const [currencyInfoIsLoading, setCurrencyInfoIsLoading] = useState(false);

  const { options, setOptions, dropdownValue, handlerDropdown } = useDropdown({
    option: [],
    value: {
      key: "usd",
      value: "Market- USD",
    },
  });

  /* Запрос данных для выпадающего списка*/
  useEffect(() => {
    setCurrencyInfoIsLoading(true);
    axios
      .get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
      .then((res) => {
        const data = options;
        res.data.sort().forEach((element: string, index: number) => {
          data[index] = {
            key: element,
            value: `Market- ${element.toUpperCase()}`,
          };
        });
        setOptions(data);
        setCurrencyInfoIsLoading(false);
      })
      .catch((error) => alert(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCoinInfoIsLoading(true);

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${dropdownValue.key}&order=market_cap_desc&per_page=100&page=1&sparkline=true`
      )
      .then((res) => {
        setCoins(res.data);
        setCoinInfoIsLoading(false);
      })
      .catch((error) => alert(error));
  }, [dropdownValue]);

  const searchedCoins: Coin[] = coins.filter((coin: Coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className={styles["coin-list-page"]}>
      {currencyInfoIsLoading ? (
        <Loader />
      ) : (
        <Dropdown
          onChange={handlerDropdown}
          options={options}
          value={dropdownValue}
          disabled={coinInfoIsLoading}
          className={styles["coin-list-page__dropdown"]}
        />
      )}
      <Search
        disabled={coinInfoIsLoading}
        value={search}
        type="text"
        className={styles["coin-list-page__search"]}
        onChange={handleInput}
        buttonText="Cancel"
        placeholder="Search Cryptocurrency"
        buttonOnClick={handlerSearchButton}
      />
      <div className={styles["coin-list-page__items-list"]}>
        {!coinInfoIsLoading ? (
          <>
            <CoinList
              paginationHide={search === ""}
              searchedCoins={searchedCoins}
              currency={dropdownValue.key}
              contentCount={coins.length}
            />
            {searchedCoins.length === 0 && (
              <div className={classNames("text-center")}>Такой монеты нет</div>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default CoinListPage;
