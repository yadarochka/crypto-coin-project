import { useEffect, useState } from "react";

import Card from "@components/UI/Card";
import Chart from "@components/UI/Chart";
import Loader from "@components/UI/Loader";
import { Coin } from "@type/CoinType";
import { convertTimestamp } from "@utils/convertTimestamp";
import { rounding } from "@utils/rounding";
import axios from "axios";
import classNames from "classnames";
import { useParams } from "react-router-dom";

import styles from "./CoinPage.module.scss";

const CoinPage = () => {
  const [coin, setCoin] = useState<Coin>();

  const { name } = useParams();

  const [chart, setChart] = useState<number[][]>();

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${name}?localization=false&tickers=false&market_data=true&community_data=false&develope`
      )
      .then((res) => {
        setCoin(res.data);
      })
      .catch((error) => alert(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${name}/ohlc?vs_currency=usd&days=1`
      )
      .then((res) => {
        setChart(res.data);
      })
      .catch((error) => alert(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {coin ? (
        <>
          <div className={styles["coin-page__header"]}>
            <div className={styles["coin-page__header__name-box"]}>
              <img
                className={styles["coin-page__header__img"]}
                src={coin.image.thumb}
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
                {`$${coin.market_data.current_price.usd}`}
              </span>
              <span
                className={classNames(
                  styles["coin-page__header__price-info__price-change"],
                  {
                    [styles.success]:
                      coin.market_data.price_change_24h_in_currency.usd > 0,
                    [styles.danger]:
                      coin.market_data.price_change_24h_in_currency.usd < 0,
                  }
                )}
              >
                {`${rounding(
                  coin.market_data.price_change_24h_in_currency.usd,
                  6
                )} (${rounding(
                  coin.market_data.price_change_percentage_24h_in_currency.usd
                )}%)`}
              </span>
            </div>
          </div>
          <div className={classNames(styles["coin_page__chart"])}>
            {chart ? (
              <Chart
                onMouseEvent={true}
                coinData={chart.map((arr) => arr[2])}
                coinLabels={chart.map((arr) => convertTimestamp(arr[0]))}
              />
            ) : (
              <Loader />
            )}
          </div>
          <Card
            currency={"USD"}
            key={coin.id}
            name={coin.name}
            subtitle={coin.symbol}
            image={coin.image.thumb}
            price={coin.market_data.current_price.usd}
            priceChange={
              coin.market_data.price_change_percentage_24h_in_currency.usd
            }
            className={classNames(styles["coin_page__card"])}
            withChart={false}
            userType={true}
          />
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default CoinPage;
