import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import { CoinListModel } from "store/models";
import { rounding } from "utils/rounding";

import Card from "components/UI/Card";

import styles from "./CoinList.module.scss";

type CoinListProps = {
  searchedCoins: CoinListModel[];
  currency: string;
};

const CoinList = ({
  /** Найденные в поиске монеты */
  searchedCoins,
  /** Валюта */
  currency,
}: CoinListProps) => {
  const labels = React.useMemo(
    () => Array.from({ length: 100 }, (_, index) => String(index)),
    []
  );

  return (
    <div className={styles.list}>
      {searchedCoins.map((coin: CoinListModel) => {
        return (
          <Link
            className={styles.link}
            key={`link_${coin.id}`}
            to={`${coin.id}`}
          >
            <Card
              currency={currency}
              key={coin.id}
              name={coin.name}
              subtitle={coin.symbol}
              image={coin.image}
              price={rounding(coin.currentPrice, 5)}
              priceChange={rounding(coin.priceChangePercentage7dInCurrency, 5)}
              className={styles.card}
              coinData={coin.sparkline7d.price}
              coinLabels={labels}
              onMouseEvent={false}
            />
          </Link>
        );
      })}
    </div>
  );
};
export default CoinList;
