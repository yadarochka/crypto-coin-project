import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { useIsMobile } from "shared/hooks/useIsMobile";
import { useLocalStorage } from "shared/hooks/useLocalStorage";
import { NotFound } from "widgets/NotFound";
import { PageLoader } from "widgets/PageLoader";

import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { NotFoundPage } from "pages/NotFoundPage";
import coinListStore from "store/coinListStore";
import { Meta } from "utils/meta";
import { rounding } from "utils/rounding";
import { useAsync } from "utils/useAsync";
import { useLocalStore } from "utils/useLocalStore";

import CoinList from "./components/CoinList";
import Button from "components/UI/Button";
import Dropdown, { Option } from "components/UI/Dropdown";
import { IncreaseOrDecrease } from "components/UI/IncreaseOrDecrease";
import Search from "components/UI/Search";
import { Tooltip } from "components/UI/Tooltip";

import styles from "./CoinListPage.module.scss";

const CoinListPage = () => {
  const isMobile = useIsMobile();
  const contentPerPage = isMobile ? 12 : 24;
  const store = useLocalStore(() => new coinListStore(contentPerPage));
  const navigate = useNavigate();
  useAsync(store.fetch, []);
  const [searchParams, setSearchParams] = useLocalStorage(
    "URLSearchParams",
    ""
  );

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
    setSearchParams(params.toString());
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

  const loadMoreData = useCallback(() => {
    store.pageIncrement();
    store.coinListFetch();
  }, [store.page]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      store.searchStore.search = event.target.value;
    },
    [store.searchStore.search]
  );

  const handleButtonClick: () => void = useCallback(() => {
    store.searchFetch();
  }, [store.searchStore.search]);

  const MarketIs = () => (
    <section className={styles.marketInfo}>
      <h2
        className={
          (styles["coin-list-page__header-title"],
          styles["coin-list-page__title"])
        }
      >
        Market is {store.marketCapChange > 0 ? "up " : "down "}
        <IncreaseOrDecrease
          percent
          number={rounding(store.marketCapChange, 2)}
        />
      </h2>
      <span
        className={
          (styles["coin-list-page__header-subtitle"],
          styles["coin-list-page__subtitle"])
        }
      >
        In the past 24 hours
      </span>
    </section>
  );

  const CoinInfo = () => (
    <div>
      <div className={styles["coin-list-page__coins-section__header"]}>
        <h2 className={styles["coin-list-page__coin-section-title"]}>Coins</h2>
        <Tooltip className={styles["coins-section__tooltip"]}>
          7 Days Range
        </Tooltip>
      </div>
      <div className={classNames(styles["position-relative"], styles["mb-1"])}>
        <span className={classNames(styles["coin-list-page__subtitle"])}>
          Active cryptocurrencies:{" "}
          {store.globalDataStore.globalData.activeCryptocurrencies}
        </span>
      </div>
    </div>
  );

  const Filters = () => (
    <div className={styles.filters}>
      <div className={styles.relative}>
        <Dropdown
          disabled={store.meta === Meta.loading}
          onChange={handlerDropdownCategoryChange}
          options={store.categoryStore.options}
          value={store.categoryStore.value}
          className={styles.dropdownCategory}
        />
      </div>
      <div className={styles.relative}>
        <Dropdown
          disabled={store.meta === Meta.loading}
          onChange={handlerDropdownCurrencyChange}
          options={store.dropdownStore.dropdownOptions}
          value={store.dropdownStore.dropdownValues}
          className={styles.dropdownCurrency}
        />
      </div>
    </div>
  );

  if (store.meta === Meta.error) {
    return <NotFoundPage />;
  }

  if (
    store.globalDataStore.meta !== Meta.success ||
    store.dropdownStore.meta !== Meta.success ||
    store.categoryStore._meta !== Meta.success
  ) {
    return <PageLoader />;
  }

  return (
    <main className={styles["coin-list-page"]}>
      <section className={styles.row}>
        <MarketIs />
        <CoinInfo />
        <Filters />
        <Search
          disabled={store.meta === Meta.loading}
          value={store.searchStore.search}
          className={styles["coin-list-page__search"]}
          onChange={handleInputChange}
          buttonText="Seacrh"
          placeholder="Search Cryptocurrency"
          buttonOnClick={handleButtonClick}
        />
      </section>
      <section className={styles.coinList}>
        <h2 className={styles.title}>Searched coins</h2>
        <CoinList
          searchedCoins={store.coins}
          currency={store.dropdownStore.dropdownValues.key}
        />
        {(store.meta === Meta.loading || store.meta === Meta.initial) && (
          <PageLoader loaderSize="m" />
        )}

        {store.meta === Meta.success && store.coins.length === 0 && (
          <NotFound />
        )}
        {store.meta === Meta.success &&
          store.coins.length % store.contentPerPage === 0 && (
            <Button value="Load More" onClick={loadMoreData} />
          )}
      </section>
    </main>
  );
};

export default observer(CoinListPage);
