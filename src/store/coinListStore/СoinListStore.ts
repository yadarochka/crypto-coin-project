import {
  action,
  makeAutoObservable,
  observable,
  reaction,
  runInAction,
  toJS,
} from "mobx";
import { storeAnnotation } from "mobx/dist/internal";

import rootStore from "store/RootStore/instance";
import { defaultCategoryValue } from "store/defaultValues";
import { CoinListModel, normalizeCoinListApiModel } from "store/models";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

import CategoryStore from "./CategoryStore";
import DropdownStore from "./DropdownStore";
import GlobalDataStore from "./GlobalDataStore";
import SearchStore from "./SearchStore";
import { requestCoinList } from "./requestCoinList";

type favouritesStoreType = {
  queryString: string;
  coins: CoinListModel[];
  meta: Meta;
  isShow: boolean | undefined;
};

export default class СoinListStore implements ILocalStore {
  private _coins: CoinListModel[] = [];
  _meta: Meta;
  searchStore;
  dropdownStore;
  categoryStore;
  globalDataStore;
  favouritesStore: favouritesStoreType = {
    queryString: "",
    coins: [],
    meta: Meta.initial,
    isShow: undefined,
  };
  contentPerPage = 12;
  page = 1;
  observer = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      this.coinListFetch();
      observer.unobserve(entry.target);
    }
  }, {});

  constructor() {
    this.searchStore = new SearchStore();
    this.dropdownStore = new DropdownStore();
    this.categoryStore = new CategoryStore();
    this.globalDataStore = new GlobalDataStore();
    this._meta = Meta.initial;

    if (rootStore.query.getParam("category")) {
      this.categoryStore.value.key = rootStore.query.getParam("category");
      this.categoryStore.value.value = rootStore.query.getParam("category");
    }

    if (rootStore.query.getParam("search")) {
      this.searchStore.search = decodeURI(rootStore.query.getParam("search"));
    }

    if (rootStore.query.getParam("currency")) {
      this.dropdownStore.dropdownValues.value = `Market - ${rootStore.query
        .getParam("currency")
        .toUpperCase()}`;
      this.dropdownStore.dropdownValues.key =
        rootStore.query.getParam("currency");
    }

    this.favouritesStore.queryString = Object.keys(localStorage).join(",");
    this.favouritesStore.isShow = this.searchStore.search?.length === 0;
    this.coins = [];

    makeAutoObservable(this, {
      fetch: action.bound,
      dropdownFetch: action,
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

  get marketCapChange() {
    return this.globalDataStore.globalData.marketCapChangePercentage24hUsd;
  }

  async fetch(): Promise<void> {
    await this.globalDataStore.fetch();

    await this.dropdownFetch();

    await this.categoryStore.fetch();

    await this.coinFavouritesListFetch();

    if (this.meta === Meta.success || this.meta === Meta.loading) {
      return;
    }

    await this.coinListFetch();
  }

  async dropdownFetch(): Promise<void> {
    await this.dropdownStore.fetch();
  }

  async coinListFetch(): Promise<void> {
    this.meta = Meta.loading;

    const { isError, data } = await requestCoinList(
      this.dropdownStore.dropdownValues.key,
      this.contentPerPage,
      this.page,
      this.searchStore.search?.split(" ").join("-").toLowerCase(),
      this.categoryStore.value.key
    );
    if (isError) {
      this.meta = Meta.error;
      return;
    }
    runInAction(() => {
      this.meta = Meta.success;
      this.coins = [...this.coins, ...normalizeCoinListApiModel(data)];
      this.pageIncrement();

      if (this.searchStore.search?.length === 0) {
        this.deleteDublicateCoins();
      }

      const contentLoadTrigger = document.getElementById("loader");
      if (
        contentLoadTrigger &&
        this.searchStore.search?.length === 0 &&
        data.length > 10
      ) {
        this.observer.observe(contentLoadTrigger);
      }
    });
  }

  async coinFavouritesListFetch(): Promise<void> {
    if (!this.favouritesStore.queryString) {
      return;
    }
    this.favouritesStore.meta = Meta.loading;

    const { isError, data } = await requestCoinList(
      this.dropdownStore.dropdownValues.key,
      this.contentPerPage,
      1,
      this.favouritesStore.queryString
    );
    if (isError) {
      this.favouritesStore.meta = Meta.error;
      return;
    }
    runInAction(() => {
      this.favouritesStore.meta = Meta.success;
      this.favouritesStore.coins = normalizeCoinListApiModel(data);
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
    this.categoryStore.value = defaultCategoryValue;
    this.pageReset();
    this.coinListFetch();
  }

  showFavouritesCoins() {
    this.favouritesStore.isShow = true;
  }

  hideFavouritesCoins() {
    this.favouritesStore.isShow = false;
  }

  deleteDublicateCoins() {
    for (let i = 0; i < Object.keys(localStorage).length; i++) {
      this.coins = this.coins.filter((coin) => coin.id !== localStorage.key(i));
    }
  }

  destroy() {}
}
