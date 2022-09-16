import {
  action,
  makeAutoObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";
import { storeAnnotation } from "mobx/dist/internal";

import rootStore from "store/RootStore/instance";
import { CoinListModel, normalizeCoinListApiModel } from "store/models";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

import CategoryStore from "./CategoryStore";
import DropdownStore from "./DropdownStore";
import GlobalDataStore from "./GlobalDataStore";
import SearchStore from "./SearchStore";
import { requestCoinList } from "./requestCoinList";

export default class СoinListStore implements ILocalStore {
  _coins: CoinListModel[] = [];
  _meta: Meta = Meta.initial;
  searchStore;
  dropdownStore;
  categoryStore;
  globalDataStore;
  contentPerPage = 12;
  page = 1;
  observer = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      this.pageIncrement();
      this.fetch();
      observer.unobserve(entry.target);
    }
  }, {});

  constructor() {
    this.searchStore = new SearchStore();
    this.dropdownStore = new DropdownStore();
    this.categoryStore = new CategoryStore();
    this.globalDataStore = new GlobalDataStore();
    this.categoryStore.value.key = rootStore.query.getParam("category")
      ? rootStore.query.getParam("category")
      : "all";
    this.categoryStore.value.value = rootStore.query.getParam("category")
      ? rootStore.query.getParam("category")
      : "All categories";
    this.searchStore._search = rootStore.query.getParam("search")
      ? decodeURI(rootStore.query.getParam("search"))
      : "";

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
      dropdownFetch: action,
      categoryFetch: action,
      pageReset: action.bound,
      pageIncrement: action,
      categoryStore: observable,
    });
  }

  get meta() {
    return this._meta;
  }

  set meta(newMeta: Meta) {
    this._meta = newMeta;
  }

  get coins() {
    return this._coins;
  }

  set coins(newCoins) {
    this._coins = newCoins;
  }

  async fetch(): Promise<void> {
    if (
      this.globalDataStore.meta !== Meta.loading &&
      this.globalDataStore.meta !== Meta.success
    ) {
      this.globalDataStore.fetch();
    }
    if (
      this.dropdownStore.meta !== Meta.loading &&
      this.dropdownStore.meta !== Meta.success
    ) {
      this.dropdownFetch();
    }

    if (
      this.categoryStore.meta !== Meta.loading &&
      this.categoryStore.meta !== Meta.success
    ) {
      this.categoryFetch();
    }

    if (this.meta !== Meta.loading) {
      await this.coinListFetch();
    }
  }

  async dropdownFetch(): Promise<void> {
    await this.dropdownStore.fetch();
  }

  async categoryFetch(): Promise<void> {
    await this.categoryStore.fetch();
  }

  async coinListFetch(): Promise<void> {
    this.meta = Meta.loading;

    const { isError, data } = await requestCoinList(
      this.dropdownStore.dropdownValues.key,
      this.contentPerPage,
      this.page,
      this.searchStore.search,
      this.categoryStore.value.key
    );
    if (isError) {
      this.meta = Meta.error;
      return;
    }
    runInAction(() => {
      this.meta = Meta.success;
      this.coins = [...this.coins, ...normalizeCoinListApiModel(data)];
      const contentLoadTrigger = document.getElementById("loader");
      if (contentLoadTrigger && this.searchStore.search?.length === 0) {
        this.observer.observe(contentLoadTrigger);
      }
    });
  }

  pageReset() {
    this.page = 1;
  }
  pageIncrement() {
    this.page++;
  }

  searchFetch() {
    this.coins = [];
    this.pageReset();
    this.fetch();
  }

  destroy() {}
}
