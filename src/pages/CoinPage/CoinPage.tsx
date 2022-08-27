import { useEffect, useState } from "react";

import Card from "@components/UI/Card";
import Loader from "@components/UI/Loader";
import { Coin } from "@type/CoinType";
import { rounding } from "@utils/rounding";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./CoinPage.module.scss";

const CoinPage = () => {
  const [coin, setCoin] = useState<Coin | undefined>();

  const { name } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${name}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
      )
      .then((res) => {
        setCoin(res.data[0]);
      })
      .catch((error) => alert(error));
  });
  return (
    <div>
      {typeof coin != "undefined" ? (
        <>
          <div className={styles["coin-page__header"]}>
            <div className={styles["coin-page__header__name-box"]}>
              <img
                className={styles["coin-page__header__img"]}
                src={coin.image}
                alt={`Изображение ${coin.name}`}
              ></img>
              <div>
                <h1 className={styles["coin-page__header__name-box__name"]}>
                  {coin.name}
                </h1>
                <span className={styles["coin-page__header__name-box__symbol"]}>
                  ({coin.symbol.toUpperCase()})
                </span>
              </div>
            </div>
            <div className={styles["coin-page__header__price-info"]}>
              <span className={styles["coin-page__header__price-info__price"]}>
                {coin.current_price}
              </span>
              {coin.price_change_percentage_24h > 0 && (
                <span
                  className={`${styles["coin-page__header__price-info__price-change"]} ${styles["success"]}`}
                >
                  {`+ ${rounding(coin.price_change_24h, 6)} (${rounding(
                    coin.price_change_percentage_24h
                  )}%)`}
                </span>
              )}
              {coin.price_change_percentage_24h < 0 && (
                <span
                  className={`${styles["coin-page__header__price-info__price-change"]} ${styles["danger"]}`}
                >
                  {`${rounding(coin.price_change_24h, 6)} (${rounding(
                    coin.price_change_percentage_24h
                  )}%)`}
                </span>
              )}
            </div>
          </div>
          <div className={styles["coin-page__chart"]}>Здесь график</div>
          <Card
            currency={"USD"}
            key={coin.id}
            name={coin.name}
            subtitle={coin.symbol}
            image={coin.image}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            className={""}
            withChart={false}
            userType={true}
          ></Card>
        </>
      ) : (
        <>
          <Loader></Loader>
        </>
      )}
    </div>
  );
};

export default CoinPage;
