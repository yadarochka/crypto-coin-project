import { useCallback, useEffect } from "react";

import Dropdown, { Option } from "components/UI/Dropdown";
import Loader from "components/UI/Loader";
import Search from "components/UI/Search";
import coinListStore from "store/coinListStore";
import { Meta } from "utils/meta";
import { useAsync } from "utils/useAsync";
import { useLocalStore } from "utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./CoinListPage.module.scss";
import CoinList from "./components/CoinList";
import React from "react";

const CoinListPage = () => {
  const store = useLocalStore(() => new coinListStore());
  useAsync(store.fetch, [store.dropdownStore.dropdownValues]);

  const handlerDropdownChange = useCallback(
    (value: Option) => {
      store.dropdownStore.dropdownValues = value;
    },
    [store.dropdownStore.dropdownValues]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      store.searchStore.search = event.target.value;
    },
    [store.searchStore.search]
  );
  const handleButtonClick = useCallback(() => {
    store.searchStore.search = "";
  }, [store.searchStore.search]);

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();
    if (store.searchStore._search) {
      params.append("search", store.searchStore._search);
    }
    if (store.dropdownStore.dropdownValues.key !== "usd") {
      params.append("currency", store.dropdownStore.dropdownValues.key);
    }
    if (store.paginationStore.page !== 1) {
      params.append("page", String(store.paginationStore.page));
    } 
    navigate({ search: params.toString() });
  }, [
    store.searchStore._search,
    navigate,
    store.dropdownStore.dropdownValues.key,
    store.paginationStore.page,
  ]);

  return (
    <div className={styles["coin-list-page"]}>
      <Dropdown
        onChange={handlerDropdownChange}
        options={store.dropdownStore.dropdownOptions}
        value={store.dropdownStore.dropdownValues}
        className={styles["coin-list-page__dropdown"]}
      />
      <Search
        disabled={false}
        value={store.searchStore.search}
        type="text"
        className={styles["coin-list-page__search"]}
        onChange={handleInputChange}
        buttonText="Cancel"
        placeholder="Search Cryptocurrency"
        buttonOnClick={handleButtonClick}
      />

      {store.meta !== Meta.loading ? (
        <div className={styles["coin-list-page__items-list"]}>
          <CoinList
            paginationHide={!store.serchedCoins.length}
            searchedCoins={store.serchedCoins}
            currency={store.dropdownStore.dropdownValues.key}
            contentCount={store.coins.length}
            paginationStore={store.paginationStore}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default observer(CoinListPage);
