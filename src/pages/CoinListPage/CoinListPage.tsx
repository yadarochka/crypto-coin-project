import React, { useState, useEffect } from "react";

import Loader from "@components/UI/Loader";
import Search from "@components/UI/Search";
import { rounding } from "@utils/rounding";
import axios from "axios";
import { Link } from "react-router-dom";

import { Coin } from "../../type/CoinType";
import styles from "./CoinListPage.module.scss";
import { Card } from "./components/CoinCard/Card";

const CoinListPage = () => {
  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchedCoins = coins.filter((coin: Coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        setIsLoading(false);
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <div>
      <Search
        type="text"
        className={styles["coin-list-search"]}
        onChange={handleInput}
        buttonText="Cancel"
        placeholder="Search Cryptocurrency"
      ></Search>
      <div className={styles["coin-list"]}>
        {!isLoading ? (
          searchedCoins.map((coin: Coin) => {
            return (
              <Link
                className={styles["coin-list__link"]}
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
                  className={styles["coin-list__item"]}
                  priceType={true}
                ></Card>
              </Link>
            );
          })
        ) : (
          <Loader></Loader>
        )}
      </div>
    </div>
  );
};

export default CoinListPage;
