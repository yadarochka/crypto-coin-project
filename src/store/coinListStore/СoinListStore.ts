import { CoinListModel } from "store/models";
import PaginationStore from "store/paginationStore";
import rootStore from "store/RootStore/instance";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";
import {
  action,
  computed,
  reaction,
  makeAutoObservable,
  runInAction,
} from "mobx";

import DropdownStore from "./DropdownStore";
import { requestCoinList } from "./requestCoinList";
import SearchStore from "./SearchStore";

export default class СoinListStore implements ILocalStore {
  _coins: CoinListModel[] = [];
  _meta: Meta;
  searchStore;
  dropdownStore;
  paginationStore;

  constructor() {
    this._meta = Meta.initial;
    this.searchStore = new SearchStore();
    this.dropdownStore = new DropdownStore();
    this.paginationStore = new PaginationStore(10);
    this.paginationStore.page = Number(rootStore.query.getParam("page")) || 1;
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

  set meta(newMeta:Meta){
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

  _queryPaginationReaction = reaction(
    () => this.serchedCoins.length,
    () => {
      this.paginationStore.count = this.serchedCoins.length;
      this.paginationStore.page = 1;
    }
  );

  async fetch(): Promise<void> {
    if (this.dropdownStore.meta === Meta.loading) return;
    else {
      await this.dropdownStore.fetch();
    }

    this.coins = [];
    this.meta = Meta.loading;

    const { isError, data } = await requestCoinList(
      this.dropdownStore.dropdownValues.key
    );
    if (isError) {
      this.meta = Meta.error;
      return;
    }
    runInAction(() => {
      this.meta = Meta.success;
      this.coins = data;
      this.paginationStore.count = this.coins.length;
    });
  }

  destroy() {
    // если диспоузить реакцию она перестает работать
    // this._queryPaginationReaction();
  }
}
