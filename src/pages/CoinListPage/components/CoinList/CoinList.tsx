import Card from "@components/UI/Card";
import { Coin } from "@type/CoinType";
import { rounding } from "@utils/rounding";
import { Link } from "react-router-dom";

import styles from "./CoinList.module.scss";

type CoinListProps = {
  searchedCoins: Coin[];
  currency: string;
};

const CoinList = ({ searchedCoins, currency }: CoinListProps) => {
  return (
    <div className={styles["coin-list"]}>
      {searchedCoins.map((coin: Coin) => {
        return (
          <Link
            className={styles["coin-list__link"]}
            key={`link_${coin.id}`}
            to={`/coins/${coin.id}`}
          >
            <Card
              currency={currency.toUpperCase()}
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
      })}
    </div>
  );
};

export default CoinList;
