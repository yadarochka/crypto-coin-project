import { useCallback, useEffect } from "react";

import Dropdown from "@components/UI/Dropdown";
import Loader from "@components/UI/Loader";
import Search from "@components/UI/Search";
import coinListStore from "@store/coinListStore";
import { Meta } from "@utils/meta";
import { useAsync } from "@utils/useAsync";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./CoinListPage.module.scss";
import CoinList from "./components/CoinList";

const CoinListPage = () => {
  const store = useLocalStore(() => new coinListStore());
  useAsync(store.fetch, [store.dropdownStore.dropdownValues]);

  const handlerDropdown = useCallback(
    (args: any) => {
      store.dropdownStore.dropdownValues = args;
    },
    [store.dropdownStore]
  );

  const handleInput = useCallback(
    (args: any) => {
      store.searchStore.search = args.target.value;
    },
    [store.searchStore]
  );
  const handleButton = useCallback(() => {
    store.searchStore.search = "";
  }, [store.searchStore]);

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();
    if (store.searchStore._search) {
      params.append("search", store.searchStore._search);
    } else {
      params.delete("search");
    }
    if (store.dropdownStore.dropdownValues.key !== "usd") {
      params.append("currency", store.dropdownStore.dropdownValues.key);
    } else {
      params.delete("currency");
    }
    if (store.paginationStore.page !== 1) {
      params.append("page", String(store.paginationStore.page));
    } else {
      params.delete("page");
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
        onChange={handlerDropdown}
        options={store.dropdownStore.dropdownOptions}
        value={store.dropdownStore.dropdownValues}
        className={styles["coin-list-page__dropdown"]}
      />
      <Search
        disabled={false}
        value={store.searchStore.search}
        type="text"
        className={styles["coin-list-page__search"]}
        onChange={handleInput}
        buttonText="Cancel"
        placeholder="Search Cryptocurrency"
        buttonOnClick={handleButton}
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
