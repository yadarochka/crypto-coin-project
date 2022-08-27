import React, { useState, useEffect } from "react";

import Dropdown from "@components/UI/Dropdown";
import Loader from "@components/UI/Loader";
import Search from "@components/UI/Search";
import { Coin } from "@type/CoinType";
import axios from "axios";

import useDropdown from "../../hooks/useDropdown";
import useSearchInput from "../../hooks/useSearchInput";
import styles from "./CoinListPage.module.scss";
import CoinList from "./components/CoinList";

const CoinListPage = () => {
  const { search, handleInput, handlerSearchButton } = useSearchInput();

  const [coins, setCoins] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { options, setOptions, DropdownValue, handlerDropdown } = useDropdown({
    option: [],
    value: {
      key: "usd",
      value: "Market- USD",
    },
  });

  useEffect(() => {
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
      })
      .catch((error) => alert(error));
  });

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${DropdownValue.key}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data);
        setIsLoading(false);
      })
      .catch((error) => alert(error));
  }, [DropdownValue]);

  const searchedCoins: Coin[] = coins.filter((coin: Coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className={styles["coin-list-page"]}>
      <Dropdown
        onChange={handlerDropdown}
        options={options}
        value={DropdownValue}
        className={styles["coin-list-page__dropdown"]}
      ></Dropdown>
      <Search
        value={search}
        type="text"
        className={styles["coin-list-page__search"]}
        onChange={handleInput}
        buttonText="Cancel"
        placeholder="Search Cryptocurrency"
        buttonOnClick={handlerSearchButton}
      ></Search>
      <div className={styles["coin-list-page__items-list"]}>
        {!isLoading ? (
          <>
            <CoinList
              paginationHide={search === ""}
              searchedCoins={searchedCoins}
              currency={DropdownValue.key}
            />
            {searchedCoins.length === 0 && (
              <div style={{ textAlign: "center" }}>Такой монеты нет</div>
            )}
          </>
        ) : (
          <Loader></Loader>
        )}
      </div>
    </div>
  );
};

export default CoinListPage;
