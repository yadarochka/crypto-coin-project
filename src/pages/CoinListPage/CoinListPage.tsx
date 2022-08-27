import React, { useState, useEffect } from "react";

import { Card } from "@components/UI/Card/Card";
import Dropdown from "@components/UI/Dropdown";
import Loader from "@components/UI/Loader";
import Search from "@components/UI/Search";
import { rounding } from "@utils/rounding";
import axios from "axios";
import { Link } from "react-router-dom";

import { Coin } from "../../type/CoinType";
import styles from "./CoinListPage.module.scss";

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

  const searchedCoins = coins.filter((coin: Coin) => {
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
          searchedCoins.map((coin: Coin) => {
            return (
              <Link
                className={styles["coin-list-page__items-list__link"]}
                key={`link_${coin.id}`}
                to={`/coins/${coin.id}`}
              >
                <Card
                  key={coin.id}
                  name={coin.name}
                  subtitle={coin.symbol}
                  image={coin.image}
                  price={rounding(coin.current_price, 5)}
                  priceChange={rounding(coin.price_change_percentage_24h, 5)}
                  className={styles["coin-list-page__items-list__item"]}
                  priceType={true}
                ></Card>
              </Link>
            );
          })
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
