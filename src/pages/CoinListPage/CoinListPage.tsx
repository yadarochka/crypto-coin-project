import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import coinListStore from "store/coinListStore";
import { Meta } from "utils/meta";
import { useAsync } from "utils/useAsync";
import { useLocalStore } from "utils/useLocalStore";

import CoinList from "./components/CoinList";
import Dropdown, { Option } from "components/UI/Dropdown";
import Loader from "components/UI/Loader";
import Search from "components/UI/Search";

import styles from "./CoinListPage.module.scss";

const CoinListPage = () => {
  const store = useLocalStore(() => new coinListStore());
  const navigate = useNavigate();
  useAsync(store.fetch, [store.dropdownStore.dropdownValues]);

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
          slicer={store.contentPerPage}
          searchedCoins={store.coins}
          currency={store.dropdownStore.dropdownValues.key}
        />
      </div>
      {store.meta === Meta.loading && <Loader />}
      {store.meta !== Meta.loading &&
        store.meta !== Meta.error &&
        store.coins.length === 0 && <div>Такой монеты нет</div>}
      <div id="loader" />
    </div>
  );
};

export default observer(CoinListPage);
