import classNames from "classnames";
import { observer } from "mobx-react-lite";

import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import coinListStore from "store/coinListStore";
import {
  defaultCategoryValue,
  defaultCurrencyValue,
} from "store/defaultValues";
import { Meta } from "utils/meta";
import { rounding } from "utils/rounding";
import { useAsync } from "utils/useAsync";
import { useLocalStore } from "utils/useLocalStore";

import CoinList from "./components/CoinList";
import Dropdown, { Option } from "components/UI/Dropdown";
import { IncreaseOrDecrease } from "components/UI/IncreaseOrDecrease";
import Loader from "components/UI/Loader";
import Search from "components/UI/Search";
import { Tooltip } from "components/UI/Tooltip";

import styles from "./CoinListPage.module.scss";

const CoinListPage = () => {
  const store = useLocalStore(() => new coinListStore());
  const navigate = useNavigate();
  useAsync(store.fetch, []);

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
      store.pageReset();
      store.dropdownStore.dropdownValues = value;
      store.coins = [];
      store.coinFavouritesListFetch();
      store.coinListFetch();
    },
    [store.dropdownStore.dropdownValues]
  );

  const handlerDropdownCategoryChange = useCallback(
    (value: Option) => {
      store.pageReset();
      store.categoryStore.value = value;
      store.coins = [];
      store.coinListFetch();
    },
    [store.categoryStore.value.key]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      store.searchStore.search = event.target.value;
    },
    [store.searchStore.search]
  );
  const handleButtonClick: () => void = useCallback(() => {
    if (store.searchStore.search?.length === 0) {
      store.showFavouritesCoins();
    } else {
      store.hideFavouritesCoins();
    }
    store.searchFetch();
  }, [store.searchStore.search]);

  const handleButtonHideClick: () => void = useCallback(() => {
    if (store.favouritesStore.isShow === true) {
      store.hideFavouritesCoins();
      return;
    }
    if (store.favouritesStore.isShow === false) {
      store.showFavouritesCoins();
      return;
    }
  }, [store.favouritesStore.isShow]);

  const handleResetButtonClick: () => void = useCallback(() => {
    store.dropdownStore.dropdownValues = defaultCurrencyValue;
    store.categoryStore.value = defaultCategoryValue;
    store.searchStore.search = "";
    store.pageReset();
    store.coins = [];
    store.coinListFetch();
    store.coinFavouritesListFetch();
  }, [store.dropdownStore.dropdownValues.key, store.categoryStore.value.key]);

  return (
    <div className={styles["coin-list-page"]}>
      <Dropdown
        disabled={store.meta === Meta.loading}
        onChange={handlerDropdownCategoryChange}
        options={store.categoryStore.options}
        value={store.categoryStore.value}
        className={styles["coin-list-page__dropdown-category"]}
      />
      <Dropdown
        disabled={store.meta === Meta.loading}
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
          Market is {store.marketCapChange > 0 ? "up " : "down "}
          <IncreaseOrDecrease percent={rounding(store.marketCapChange, 2)} />
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
              styles["coin-list-page__coin-section-title"],
              styles["coin-list-page__title"]
            )}
          >
            Coins
          </h2>
          <Tooltip className={styles["coins-section__tooltip"]}>
            7 Days Range
          </Tooltip>
        </div>
        <div
          className={classNames(styles["position-relative"], styles["mb-1"])}
        >
          <span className={classNames(styles["coin-list-page__subtitle"])}>
            Active cryptocurrencies:{" "}
            {store.globalDataStore.globalData.activeCryptocurrencies}
          </span>
          <span
            onClick={handleResetButtonClick}
            className={classNames(
              styles["coin-list-page__subtitle"],
              styles["reset-filters-button"],
              store.categoryStore.value.key !== defaultCategoryValue.key ||
                store.dropdownStore.dropdownValues.key !==
                  defaultCurrencyValue.key
                ? styles["display-inline"]
                : styles["display-none"]
            )}
          >
            Reset Filters
          </span>
        </div>
        <Search
          disabled={store.meta === Meta.loading}
          value={store.searchStore.search}
          type="text"
          className={styles["coin-list-page__search"]}
          onChange={handleInputChange}
          buttonText="Seacrh"
          placeholder="Search Cryptocurrency"
          buttonOnClick={handleButtonClick}
        />
        <div
          className={classNames(
            styles["display-flex"],
            styles["justify-content-sb"],
            styles["align-items-center"]
          )}
        >
          {store.favouritesStore.coins.length > 0 && (
            <>
              <h2 className={classNames(styles["m-0"], styles["font-size-20"])}>
                Favourites coins
              </h2>
              <button
                className={classNames(
                  styles["hide-button"],
                  store.favouritesStore.isShow
                    ? styles["hide-button__show"]
                    : styles["hide-button__hide"]
                )}
                onClick={handleButtonHideClick}
              />
            </>
          )}
        </div>

        {store.favouritesStore.isShow &&
          store.favouritesStore.meta !== Meta.loading && (
            <CoinList
              searchedCoins={store.favouritesStore.coins}
              currency={store.dropdownStore.dropdownValues.key}
            />
          )}

        {store.favouritesStore.meta === Meta.loading && <Loader />}
        <div className={styles["coin-list-page__items-list"]}>
          <h2 className={styles["font-size-20"]}>Serched coins</h2>

          <CoinList
            searchedCoins={store.coins}
            currency={store.dropdownStore.dropdownValues.key}
          />
          {store.meta === Meta.loading && <Loader />}

          {store.meta !== Meta.loading &&
            store.meta !== Meta.error &&
            store.coins.length === 0 && <div>Такой монеты нет</div>}
        </div>
      </section>
      {store.meta === Meta.error && <div>Error</div>}
      <div id="loader" />
    </div>
  );
};

export default observer(CoinListPage);
