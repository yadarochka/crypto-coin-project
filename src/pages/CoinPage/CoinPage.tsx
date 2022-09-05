import Card from "@components/UI/Card";
import Chart from "@components/UI/Chart";
import Loader from "@components/UI/Loader";
import CoinStore from "@store/coinStore/CoinStore";
import { convertTimestamp } from "@utils/convertTimestamp";
import { rounding } from "@utils/rounding";
import { useAsync } from "@utils/useAsync";
import { useLocalStore } from "@utils/useLocalStore";
import classNames from "classnames";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import styles from "./CoinPage.module.scss";

const CoinPage = () => {
  const { name } = useParams();

  const store = useLocalStore(() => new CoinStore(name));

  useAsync(store.fetch, [store.coin]);

  return (
    <div>
      {store.coin ? (
        <>
          <div className={styles["coin-page__header"]}>
            <div className={styles["coin-page__header__name-box"]}>
              <img
                className={styles["coin-page__header__img"]}
                src={store.coin.image.thumb}
                alt={`Изображение ${store.coin.name}`}
              ></img>
              <div>
                <h1 className={styles["coin-page__header__name-box__name"]}>
                  {store.coin.name}
                </h1>
                <span className={styles["coin-page__header__name-box__symbol"]}>
                  ({store.coin.symbol.toUpperCase()})
                </span>
              </div>
            </div>
            <div className={styles["coin-page__header__price-info"]}>
              <span className={styles["coin-page__header__price-info__price"]}>
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
          <div className={classNames(styles["coin_page__chart"])}>
            {store.chart ? (
              <Chart
                onMouseEvent={true}
                coinData={toJS(store.chart).map((arr) => arr[2])}
                coinLabels={toJS(store.chart).map((arr) =>
                  convertTimestamp(arr[0])
                )}
              />
            ) : (
              <Loader />
            )}
          </div>
          <Card
            currency={"USD"}
            key={store.coin.id}
            name={store.coin.name}
            subtitle={store.coin.symbol}
            image={store.coin.image.thumb}
            price={store.coin.currentPrice.usd}
            priceChange={store.coin.priceChangePercentage24hInCurrency.usd}
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

export default observer(CoinPage);
