import React from "react";
import { Link } from "react-router-dom";

import { CoinListModel } from "store/models";
import { rounding } from "utils/rounding";

import Card from "components/UI/Card";

import styles from "./CoinList.module.scss";

type CoinListProps = {
  searchedCoins: CoinListModel[];
  currency: string;
  slicer: number;
};

const CoinList = ({
  /** Найденные в поиске монеты */
  searchedCoins,
  /** Валюта */
  currency,
  slicer,
}: CoinListProps) => {
  const labels = React.useMemo(
    () => Array.from({ length: 100 }, (_, index) => String(index)),
    []
  );

  return (
    <div className={styles["coin-list"]}>
      {searchedCoins.map((coin: CoinListModel) => {
        return (
          <Link
            className={styles["coin-list__link"]}
            key={`link_${coin.id}`}
            to={`${coin.id}`}
          >
            <Card
              currency={currency.toUpperCase()}
              key={coin.id}
              name={coin.name}
              subtitle={coin.symbol}
              image={coin.image}
              price={rounding(coin.currentPrice, 5)}
              priceChange={rounding(coin.priceChangePercentage24h, 5)}
              className={styles["coin-list__item"]}
              priceType
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
