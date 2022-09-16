import classNames from "classnames";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import React, { ReactNode, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { NotFoundPage } from "pages/NotFoundPage";
import CoinStore from "store/coinStore/CoinStore";
import { convertTimestamp } from "utils/convertTimestamp";
import { Meta } from "utils/meta";
import { rounding } from "utils/rounding";
import { useAsync } from "utils/useAsync";
import { useLocalStore } from "utils/useLocalStore";

import Card from "components/UI/Card";
import Chart from "components/UI/Chart/Chart";
import { Option } from "components/UI/Dropdown";
import Loader from "components/UI/Loader";
import { TabBar } from "components/UI/TabBar";

import styles from "./CoinPage.module.scss";

const CoinPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const store = useLocalStore(() => new CoinStore(name));

  useAsync(store.fetch, [store.coin, store.chartStore.time.value.key]);

  const handleTabBarChange = (value: Option) => {
    store.chartStore.time.value = value;
  };

  let type = "day";

  if (store.chartStore.time.value.key === "1") {
    type = "day";
  } else if (store.chartStore.time.value.key === "max") {
    type = "year";
  } else type = "week";

  if (store.meta === Meta.error) {
    return <NotFoundPage />;
  } else
    return (
      <div className={styles["coin-page"]}>
        {store.coin ? (
          <>
            <div className={styles["coin-page__header"]}>
              <div className={styles["coin-page__header__name-box"]}>
                <div
                  onClick={() => navigate(-1)}
                  className={styles["coin-page__header__button"]}
                />
                <img
                  className={styles["coin-page__header__img"]}
                  src={store.coin.image.large}
                  alt={`Изображение ${store.coin.name}`}
                />
                <div>
                  <h1 className={styles["coin-page__header__name-box__name"]}>
                    {store.coin.name}
                  </h1>
                  <span
                    className={styles["coin-page__header__name-box__symbol"]}
                  >
                    ({store.coin.symbol.toUpperCase()})
                  </span>
                </div>
              </div>
              <div className={styles["coin-page__header__price-info"]}>
                <span
                  className={styles["coin-page__header__price-info__price"]}
                >
                  {`$${store.coin.currentPrice.usd}`}
                </span>
                <span
                  className={classNames(
                    styles["coin-page__header__price-info__price-change"],
                    {
                      [styles.success]:
                        store.coin.priceChange24hInCurrency.usd > 0,
                      [styles.danger]:
                        store.coin.priceChange24hInCurrency.usd < 0,
                    }
                  )}
                >
                  {`${rounding(
                    store.coin.priceChange24hInCurrency.usd,
                    6
                  )} (${rounding(
                    store.coin.priceChangePercentage24hInCurrency.usd
                  )}%)`}
                </span>
              </div>
            </div>
            <div className={classNames(styles["coin-page__chart-box"])}>
              {store.chartStore.chart.length > 0 ? (
                <Chart
                  className={classNames(styles["coin-page__chart"])}
                  onMouseEvent={true}
                  coinData={toJS(store.chartStore.chart).map((arr) => arr[2])}
                  coinLabels={toJS(store.chartStore.chart).map((arr) =>
                    convertTimestamp(arr[0])
                  )}
                  type={type}
                />
              ) : (
                <Loader />
              )}
            </div>
            <TabBar
              options={store.chartStore.time.options}
              value={store.chartStore.time.value}
              onChange={handleTabBarChange}
            />
            <Card
              currency={"USD"}
              key={store.coin.id}
              name={store.coin.name}
              subtitle={store.coin.symbol}
              image={store.coin.image.large}
              price={store.coin.currentPrice.usd}
              priceChange={store.coin.priceChangePercentage24hInCurrency.usd}
              className={classNames(styles["coin_page__card"])}
              withChart={false}
              cardType="userType"
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

export default observer(CoinPage);
