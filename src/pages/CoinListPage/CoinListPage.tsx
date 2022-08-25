import React, { useState, useEffect } from "react";

import axios from "axios";

import Search from "../../components/Search";
import { Card } from "./components/CoinCard/Card";

const CoinListPage = () => {
  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState("");

  const handleInput = (e: any) => {
    setSearch(e.target.value);
  };

  const searchedCoins = coins.filter((coin: any) => {
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
      {searchedCoins.map((coin: any) => {
        return (
          <Card
            key={coin.id}
            name={coin.name}
            subtitle={coin.symbol}
            image={coin.image}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
          ></Card>
        );
      })}
    </div>
  );
};

export default CoinListPage;
