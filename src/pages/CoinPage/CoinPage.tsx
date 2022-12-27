import { ThemeContext } from "app/providers/ThemeProvider";
import { themes } from "app/providers/ThemeProvider/ThemeContext";
import classNames from "classnames";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useLocalStorage } from "shared/hooks/useLocalStorage";
import { PageLoader } from "widgets/PageLoader";

import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { NotFoundPage } from "pages/NotFoundPage";
import CoinStore from "store/coinStore/CoinStore";
import { currencySymbol } from "store/coinStore/currencySymbol";
import { convertTimestamp } from "utils/convertTimestamp";
import { Meta } from "utils/meta";
import { rounding } from "utils/rounding";
import { useAsync } from "utils/useAsync";
import { useLocalStore } from "utils/useLocalStore";

import Chart from "components/UI/Chart";
import Dropdown, { Option } from "components/UI/Dropdown";
import { TabBar } from "components/UI/TabBar";
import { Tooltip, TooltipPostition } from "components/UI/Tooltip";

import styles from "./CoinPage.module.scss";

const CoinPage = () => {
  const { theme } = useContext(ThemeContext);

  const chartColor = theme === themes.light ? "#39f" : "#9370db";

  const { name } = useParams();
  const navigate = useNavigate();

  const store = useLocalStore(() => new CoinStore(name));

  const [searchParams, setSearchParams] = useLocalStorage(
    "URLSearchParams",
    ""
  );

  const navigateToPrevPage = () => navigate("/?" + searchParams);

  useAsync(store.fetch, [
    store.coin,
    store.chartStore.time.value.key,
    store.currencyStore.dropdownValues,
  ]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (store.chartStore.time.value.key !== "1") {
      params.append("chart_range", store.chartStore.time.value.key);
    }
    if (store.currencyStore.dropdownValues.key !== "usd") {
      params.append("currency", store.currencyStore.dropdownValues.key);
    }
    navigate({ search: params.toString() });
  }, [
    store.chartStore.time.value.key,
    navigate,
    store.currencyStore.dropdownValues.key,
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
    store.currencyStore.dropdownValues.key.toUpperCase();

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
      <main className={styles["coin-page"]}>
        {store.coin ? (
          <>
            <section className={styles["coin-page__header"]}>
              <div className={styles["coin-page__header__name-box"]}>
                <div
                  onClick={navigateToPrevPage}
                  className={styles["coin-page__header__button"]}
                />
                <img
                  className={styles["coin-page__header__img"]}
                  src={store.coin.image.large}
                  alt={store.coin.name}
                />
                <div>
                  <h1 className={styles["coin-page__header__name-box__name"]}>
                    {store.coin.name}
                  </h1>
                  {store.coin.symbol.length < 5 && (
                    <span
                      className={styles["coin-page__header__name-box__symbol"]}
                    >
                      ({store.coin.symbol.toUpperCase()})
                    </span>
                  )}
                </div>
                <div className={styles["coin-page__header__rank"]}>
                  Rank #
                  {store.coin.marketCapRank ? store.coin.marketCapRank : "?"}
                </div>
              </div>
              <div className={styles["coin-page__header__price-info"]}>
                <span
                  className={styles["coin-page__header__price-info__price"]}
                >
                  {`${symbol}${
                    store.coin.currentPrice[
                      `${store.currencyStore.dropdownValues.key}`
                    ]
                  }`}
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
                    store.coin.priceChange24hInCurrency[
                      `${store.currencyStore.dropdownValues.key}`
                    ],
                    6
                  )} (${rounding(
                    store.coin.priceChangePercentage24hInCurrency[
                      `${store.currencyStore.dropdownValues.key}`
                    ]
                  )}%)`}
                </span>
                <Tooltip className={styles["header__tooltip"]}>
                  <span>24H Range</span>
                </Tooltip>
                <Dropdown
                  onChange={handlerDropdownCurrencyChange}
                  options={store.currencyStore.dropdownOptions}
                  value={store.currencyStore.dropdownValues}
                  className={styles["coin-page__header__dropdown-currency"]}
                />
                <div className={styles["coin-page__header__coin-info-table"]}>
                  {store.coin.marketCap.usd > 0 && (
                    <div className={styles["coin-info-row"]}>
                      <span className={styles["coin-info-row__title"]}>
                        Market cap{" "}
                        <Tooltip position={TooltipPostition.bot}>
                          <div>
                            Market Cap = Current Price x Circulating Supply
                          </div>
                          <div>
                            Refers to the total market value of a
                            cryptocurrency’s circulating supply. It is similar
                            to the stock market’s measurement of multiplying
                            price per share by shares readily available in the
                            market (not held & locked by insiders, governments)
                          </div>
                          <a href="https://en.wikipedia.org/wiki/Market_capitalization">
                            Read more...
                          </a>
                        </Tooltip>
                      </span>
                      <span>
                        {
                          store.coin.marketCap[
                            store.currencyStore.dropdownValues.key
                          ]
                        }
                        {symbol}
                      </span>
                    </div>
                  )}
                  {store.coin.fullyDilutedValuation.usd > 0 && (
                    <div className={styles["coin-info-row"]}>
                      <span className={styles["coin-info-row__title"]}>
                        Fully Diluted Valuation{" "}
                        <Tooltip position={TooltipPostition.bot}>
                          <div>FDV = Current Price x Max Supply</div>
                          <div>
                            The market capitalization (valuation) if the max
                            supply of a coin is in circulation. Note that it can
                            take 3, 5, 10 or more years before the FDV can be
                            reached, depending on how the emission schedule is
                            designed.
                          </div>
                        </Tooltip>
                      </span>
                      <span>
                        {`${store.coin.fullyDilutedValuation.usd}${symbol}`}
                      </span>
                    </div>
                  )}
                  {store.coin.circulatingSupply > 0 && (
                    <div className={styles["coin-info-row"]}>
                      <span className={styles["coin-info-row__title"]}>
                        Circulating Supply{" "}
                        <Tooltip position={TooltipPostition.bot}>
                          <div>
                            The amount of coins that are circulating in the
                            market and are tradeable by the public. It is
                            comparable to looking at shares readily available in
                            the market (not held & locked by insiders,
                            governments).
                          </div>
                        </Tooltip>
                      </span>
                      <span>{store.coin.circulatingSupply}</span>
                    </div>
                  )}
                  {store.coin.totalSupply > 0 && (
                    <div className={styles["coin-info-row"]}>
                      <span className={styles["coin-info-row__title"]}>
                        Total Supply{" "}
                        <Tooltip position={TooltipPostition.bot}>
                          <div>
                            The amount of coins that have already been created,
                            minus any coins that have been burned (removed from
                            circulation). It is comparable to outstanding shares
                            in the stock market.
                          </div>
                          <div>
                            Total Supply = Onchain supply - burned tokens
                          </div>
                        </Tooltip>
                      </span>
                      <span>{store.coin.totalSupply}</span>
                    </div>
                  )}
                  {store.coin.maxSupply > 0 && (
                    <div className={styles["coin-info-row"]}>
                      <span className={styles["coin-info-row__title"]}>
                        Max Supply{" "}
                        <Tooltip position={TooltipPostition.bot}>
                          <div>
                            The maximum number of coins coded to exist in the
                            lifetime of the cryptocurrency. It is comparable to
                            the maximum number of issuable shares in the stock
                            market.
                          </div>
                          <div>Max Supply = Theoretical maximum as coded</div>
                        </Tooltip>
                      </span>
                      <span>{store.coin.maxSupply}</span>
                    </div>
                  )}
                </div>
              </div>
            </section>
            <section className={styles["coin-page__chart-section"]}>
              <h2>{`${
                store.coin.name
              } Price Chart (${store.coin.symbol.toUpperCase()}/${store.currencyStore.dropdownValues.key.toUpperCase()})`}</h2>
              <div className={classNames(styles["coin-page__chart-box"])}>
                {store.chartStore.chart.length > 0 ? (
                  <Chart
                    label={symbol}
                    className={classNames(styles["coin-page__chart"])}
                    onMouseEvent={true}
                    color={chartColor}
                    coinData={toJS(store.chartStore.chart).map((arr) => arr[2])}
                    coinLabels={toJS(store.chartStore.chart).map((arr) =>
                      convertTimestamp(arr[0])
                    )}
                    type={type}
                  />
                ) : (
                  <PageLoader />
                )}
              </div>
            </section>
            <TabBar
              className={styles["coin-page__tab-bar"]}
              options={toJS(store.chartStore.time.options)}
              value={toJS(store.chartStore.time.value)}
              onChange={handleTabBarChange}
            />
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
