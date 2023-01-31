import { ThemeContext } from "app/providers/ThemeProvider";
import { themes } from "app/providers/ThemeProvider/ThemeContext";
import classnames from "classnames";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { PageLoader } from "widgets/PageLoader";

import React, { useCallback, useContext } from "react";
import { useParams } from "react-router-dom";

import { NotFoundPage } from "pages/NotFoundPage";
import CoinStore from "store/coinStore/CoinStore";
import { currencySymbol } from "store/coinStore/currencySymbol";
import { convertTimestamp } from "utils/convertTimestamp";
import { Meta } from "utils/meta";
import { useAsync } from "utils/useAsync";
import { useLocalStore } from "utils/useLocalStore";

import { InfoSection } from "./components/InfoSection/InfoSection";
import { PriceSection } from "./components/PriceSection/PriceSection";
import Chart from "components/UI/Chart";
import Dropdown, { Option } from "components/UI/Dropdown";
import { TabBar } from "components/UI/TabBar";

import styles from "./CoinPage.module.scss";

const CoinPage = () => {
  const { theme } = useContext(ThemeContext);

  const chartColor = theme === themes.light ? "#39f" : "#9370db";

  const { name } = useParams();

  const store = useLocalStore(() => new CoinStore(name));

  useAsync(store.fetch, [
    store.coin,
    store.chartStore.time.value.key,
    store.currencyStore.dropdownValues,
  ]);

  const handlerDropdownCurrencyChange = useCallback(
    (value: Option) => {
      store.currencyStore.dropdownValues = value;
    },
    [store.currencyStore.dropdownValues]
  );

  const handleTabBarChange = (value: Option) => {
    store.chartStore.time.value = value;
  };

  const symbol: string =
    currencySymbol[store.currencyStore.dropdownValues.key] ||
    store.currencyStore.dropdownValues.key.toUpperCase() + " ";

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
      <main className={classnames(styles["coin-page"], styles[theme])}>
        {store.coin ? (
          <>
            <section className={styles["coin-page__header"]}>
              <InfoSection
                name={store.coin.name}
                img={store.coin.image.large}
                symbol={store.coin.symbol}
                rank={store.coin.marketCapRank}
                currency={store.currencyStore.dropdownValues.key}
                currentPrice={store.coin.currentPrice}
                priceChange={store.coin.priceChange24hInCurrency}
                pricePercentageChange={
                  store.coin.priceChangePercentage24hInCurrency
                }
              >
                <Dropdown
                  onChange={handlerDropdownCurrencyChange}
                  options={store.currencyStore.dropdownOptions}
                  value={store.currencyStore.dropdownValues}
                  className={styles.dropdownCurrency}
                />
              </InfoSection>
              <PriceSection
                marketCap={store.coin.marketCap}
                currency={store.currencyStore.dropdownValues.key}
                symbol={symbol}
                fullyDilutedValuation={store.coin.fullyDilutedValuation}
                circulatingSupply={store.coin.circulatingSupply}
                totalSupply={store.coin.totalSupply}
                maxSupply={store.coin.maxSupply}
              />
            </section>
            <section className={styles["coin-page__chart-section"]}>
              <h2>{`${
                store.coin.name
              } Price Chart (${store.coin.symbol.toUpperCase()}/${store.currencyStore.dropdownValues.key.toUpperCase()})`}</h2>
              <div className={classnames(styles["coin-page__chart-box"])}>
                {store.chartStore.chart.length > 0 ? (
                  <Chart
                    label={symbol}
                    className={classnames(styles["coin-page__chart"])}
                    onMouseEvent={true}
                    color={chartColor}
                    coinData={toJS(store.chartStore.chart).map((arr) => arr[2])}
                    coinLabels={toJS(store.chartStore.chart).map((arr) =>
                      convertTimestamp(arr[0])
                    )}
                    type={type}
                  />
                ) : (
                  <div className={styles.loaderWrapper}>
                    <PageLoader />
                  </div>
                )}
              </div>
              <TabBar
                className={styles["coin-page__tab-bar"]}
                options={toJS(store.chartStore.time.options)}
                value={toJS(store.chartStore.time.value)}
                onChange={handleTabBarChange}
              />
            </section>
          </>
        ) : (
          <>
            <PageLoader />
          </>
        )}
      </main>
    );
};

export default observer(CoinPage);
