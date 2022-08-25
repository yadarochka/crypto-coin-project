import React, { useState, useEffect } from "react";

import axios from "axios";

import Search from "../../components/Search";
import styles from "./CoinListPage.module.scss";
import { Card } from "./components/CoinCard/Card";

type Coin = {
  id: number;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

const CoinListPage = () => {
  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchedCoins = coins.filter((coin: Coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => setCoins(res.data))
      .catch((error) => alert(error));
  }, []);

  return (
    <div>
      <Search type="text" onChange={handleInput}></Search>
      <div className={styles["coin-list"]}>
        {searchedCoins.map((coin: Coin) => {
          return (
            <Card
              key={coin.id}
              name={coin.name}
              subtitle={coin.symbol}
              image={coin.image}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              className={styles["coin-list__item"]}
            ></Card>
          );
        })}
      </div>
    </div>
  );
};

export default CoinListPage;
