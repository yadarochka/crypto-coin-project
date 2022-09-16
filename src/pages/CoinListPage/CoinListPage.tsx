import classNames from "classnames";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import coinListStore from "store/coinListStore";
import { Meta } from "utils/meta";
import { rounding } from "utils/rounding";
import { useAsync } from "utils/useAsync";
import { useLocalStore } from "utils/useLocalStore";

import CoinList from "./components/CoinList";
import Dropdown, { Option } from "components/UI/Dropdown";
import { IncreaseOrDecrease } from "components/UI/IncreaseOrDecrease";
import Loader from "components/UI/Loader";
import Search from "components/UI/Search";

import styles from "./CoinListPage.module.scss";

const CoinListPage = () => {
  const store = useLocalStore(() => new coinListStore());
  const navigate = useNavigate();
  useAsync(store.fetch, [
    store.dropdownStore.dropdownValues,
    store.categoryStore.value.key,
  ]);

  console.log(toJS(store.coins));

  useEffect(() => {
    const params = new URLSearchParams();
    if (store.searchStore._search) {
      params.append("search", store.searchStore._search);
    }
    if (store.dropdownStore.dropdownValues.key !== "usd") {
      params.append("currency", store.dropdownStore.dropdownValues.key);
    }
    if (store.categoryStore.value.key !== "all") {
      params.append("category", store.categoryStore.value.key);
    }
    navigate({ search: params.toString() });
  }, [
    store.searchStore._search,
    navigate,
    store.dropdownStore.dropdownValues.key,
    store.categoryStore.value.key,
  ]);

  const handlerDropdownCurrencyChange = useCallback(
    (value: Option) => {
      store.dropdownStore.dropdownValues = value;
      store.pageReset();
      store.coins = [];
    },
    [store.dropdownStore.dropdownValues]
  );

  const handlerDropdownCategoryChange = useCallback(
    (value: Option) => {
      store.categoryStore.value = value;
      store.pageReset();
      store.coins = [];
    },
    [store.categoryStore.value]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      store.searchStore.search = event.target.value;
    },
    [store.searchStore.search]
  );
  const handleButtonClick = useCallback(() => {
    store.searchFetch();
  }, []);

  return (
    <div className={styles["coin-list-page"]}>
      <Dropdown
        onChange={handlerDropdownCategoryChange}
        options={store.categoryStore.options}
        value={store.categoryStore.value}
        className={styles["coin-list-page__dropdown-category"]}
      />
      <Dropdown
        onChange={handlerDropdownCurrencyChange}
        options={store.dropdownStore.dropdownOptions}
        value={store.dropdownStore.dropdownValues}
        className={styles["coin-list-page__dropdown-currency"]}
      />
      <section className={classNames(styles["coin-list-page__header"])}>
        <h2
          className={classNames(
            styles["coin-list-page__header-title"],
            styles["coin-list-page__title"]
          )}
        >
          Market is{" "}
          {store.globalDataStore.globalData.marketCapChangePercentage24hUsd > 0
            ? "up "
            : "down "}
          <IncreaseOrDecrease
            procent={rounding(
              store.globalDataStore.globalData.marketCapChangePercentage24hUsd,
              2
            )}
          />
        </h2>
        <span
          className={classNames(
            styles["coin-list-page__header-subtitle"],
            styles["coin-list-page__subtitle"]
          )}
        >
          In the past 24 hours
        </span>
      </section>
      <section className={classNames(styles["coin-list-page__coins-section"])}>
        <div
          className={classNames(
            styles["coin-list-page__coins-section__header"]
          )}
        >
          <h2
            className={classNames(
              styles["coin-list-page__coin-sections-title"],
              styles["coin-list-page__title"]
            )}
          >
            Coins
          </h2>
          <span className={classNames(styles["coin-list-page__subtitle"])}>
            Active cryptocurrencies:{" "}
            {store.globalDataStore.globalData.activeCryptocurrencies}
          </span>
        </div>
        <Search
          disabled={false}
          value={store.searchStore.search}
          type="text"
          className={styles["coin-list-page__search"]}
          onChange={handleInputChange}
          buttonText="Поиск"
          placeholder="Search Cryptocurrency"
          buttonOnClick={handleButtonClick}
        />
        {store.meta === Meta.error && <div>Error</div>}
        <div className={styles["coin-list-page__items-list"]}>
          <CoinList
            searchedCoins={store.coins}
            currency={store.dropdownStore.dropdownValues.key}
          />
        </div>
        {store.meta === Meta.loading && <Loader />}
        {store.meta !== Meta.loading &&
          store.meta !== Meta.error &&
          store.coins.length === 0 && <div>Такой монеты нет</div>}
      </section>
      <div id="loader" />
    </div>
  );
};

export default observer(CoinListPage);
