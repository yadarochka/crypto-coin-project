import {
  action,
  makeAutoObservable,
  observable,
  reaction,
  runInAction,
  toJS,
} from "mobx";

import rootStore from "store/RootStore/instance";
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
  _coins: CoinListModel[] = [];
  _meta: Meta = Meta.initial;
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
    await this.globalDataStore.fetch();

    await this.dropdownFetch();

    await this.categoryFetch();

    await this.coinFavouritesListFetch();

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

      //удаляем дубликаты

      if (this.searchStore.search?.length === 0) {
        for (let i = 0; i < Object.keys(localStorage).length; i++) {
          this.coins = this.coins.filter(
            (coin) => coin.id !== localStorage.key(i)
          );
        }
      }
      //вставляем внизу списка блок-бесконечный-скролл

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
    if (
      this.favouritesStore.meta === Meta.success ||
      this.favouritesStore.meta === Meta.loading
    ) {
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
    this.pageReset();
    this.coinListFetch();
  }

  showFavouritesCoins() {
    this.favouritesStore.isShow = true;
  }

  hideFavouritesCoins() {
    this.favouritesStore.isShow = false;
  }

  destroy() {}
}
