import {
  action,
  computed,
  makeAutoObservable,
  observable,
  reaction,
  runInAction,
  toJS,
} from "mobx";

import rootStore from "store/RootStore/instance";
import { CoinListModel } from "store/models";
import PaginationStore from "store/paginationStore";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

import DropdownStore from "./DropdownStore";
import SearchStore from "./SearchStore";
import { requestCoinList } from "./requestCoinList";

export default class СoinListStore implements ILocalStore {
  _coins: CoinListModel[] = [];
  _meta: Meta = Meta.initial;
  searchStore;
  dropdownStore;
  contentPerPage = 20;
  page = 1;
  observer = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      this.fetch();
      observer.unobserve(entry.target);
      this.page++;
    }
  }, {});

  constructor() {
    this.searchStore = new SearchStore();
    this.dropdownStore = new DropdownStore();
    this.searchStore._search = rootStore.query.getParam("search");
    this.dropdownStore.dropdownValues.key = rootStore.query.getParam("currency")
      ? rootStore.query.getParam("currency")
      : "usd";
    this.dropdownStore.dropdownValues.value = rootStore.query.getParam(
      "currency"
    )
      ? `Market - ${rootStore.query.getParam("currency").toUpperCase()}`
      : "Market - USD";
    makeAutoObservable(this, {
      fetch: action.bound,
      coins: computed,
      serchedCoins: computed,
    });
  }

  get meta() {
    return this._meta;
  }

  set meta(newMeta: Meta) {
    this._meta = newMeta;
  }

  get serchedCoins() {
    if (!this.searchStore.search) return this.coins;
    return this.coins.filter((coin) =>
      coin.name
        .toLowerCase()
        .includes(this.searchStore.search ? this.searchStore.search : "")
    );
  }

  get coins() {
    return this._coins;
  }

  set coins(newCoins) {
    this._coins = newCoins;
  }

  async dropdownFetch(): Promise<void> {}

  async fetch(): Promise<void> {
    console.log("запуск fetch");
    if (
      this.dropdownStore.meta !== Meta.loading &&
      this.dropdownStore.meta !== Meta.success
    ) {
      await this.dropdownStore.fetch();
    }

    if (this.meta !== Meta.loading) {
      this.meta = Meta.loading;

      const { isError, data } = await requestCoinList(
        this.dropdownStore.dropdownValues.key,
        this.contentPerPage,
        this.page
      );
      if (isError) {
        this.meta = Meta.error;
        return;
      }
      runInAction(() => {
        this.meta = Meta.success;
        this.coins = [...this.coins, ...data];
        const contentLoadTrigger = document.getElementById("loader");
        if (contentLoadTrigger) this.observer.observe(contentLoadTrigger);
      });
    }
  }

  destroy() {}
}
