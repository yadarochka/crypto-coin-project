import { observer } from "mobx-react-lite";

import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import coinListStore from "store/coinListStore";
import { Meta } from "utils/meta";
import { useAsync } from "utils/useAsync";
import { useLocalStore } from "utils/useLocalStore";

import CoinList from "./components/CoinList";
import stylesCoinList from "./components/CoinList/CoinList.module.scss";
import Dropdown, { Option } from "components/UI/Dropdown";
import Loader from "components/UI/Loader";
import Search from "components/UI/Search";

import styles from "./CoinListPage.module.scss";

const CoinListPage = () => {
  const store = useLocalStore(() => new coinListStore());
  const navigate = useNavigate();
  console.log(store.page);
  useAsync(store.fetch, [store.dropdownStore.dropdownValues]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (store.searchStore._search) {
      params.append("search", store.searchStore._search);
    }
    if (store.dropdownStore.dropdownValues.key !== "usd") {
      params.append("currency", store.dropdownStore.dropdownValues.key);
    }
    navigate({ search: params.toString() });
  }, [
    store.searchStore._search,
    navigate,
    store.dropdownStore.dropdownValues.key,
  ]);

  const handlerDropdownChange = useCallback(
    (value: Option) => {
      store.dropdownStore.dropdownValues = value;
      store.coins = [];
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
      <div className={styles["coin-list-page__items-list"]}>
        <CoinList
          slicer={store.contentPerPage}
          searchedCoins={store.serchedCoins}
          currency={store.dropdownStore.dropdownValues.key}
        />
      </div>
      {store.meta === Meta.loading && <Loader />}
      <div id="loader"></div>
    </div>
  );
};

export default observer(CoinListPage);
