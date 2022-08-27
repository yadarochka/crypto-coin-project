import React, { useState, useEffect } from "react";

import Dropdown from "@components/UI/Dropdown";
import Loader from "@components/UI/Loader";
import Search from "@components/UI/Search";
import axios from "axios";

import { Coin } from "../../type/CoinType";
import styles from "./CoinListPage.module.scss";
import CoinList from "./components/CoinList";

const CoinListPage = () => {
  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [options, setOptions] = useState([]);

  const [DropdownValue, setDropdownValue] = useState<string>("usd");

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
      .then((res) => setOptions(res.data.sort()))
      .catch((error) => alert(error));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${DropdownValue}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data);
        setIsLoading(false);
      })
      .catch((error) => alert(error));
  }, [DropdownValue]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlerSearchButton: () => void = () => {
    setSearch("");
  };

  function handlerDropdown() {
    setDropdownValue(arguments[0]);
  }

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
          <CoinList searchedCoins={searchedCoins} />
        ) : (
          <Loader></Loader>
        )}
        {searchedCoins.length === 0 && (
          <div style={{ textAlign: "center" }}>Такой монеты нет</div>
        )}
      </div>
    </div>
  );
};

export default CoinListPage;
