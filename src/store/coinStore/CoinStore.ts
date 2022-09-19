import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";

import DropdownStore from "store/coinListStore/DropdownStore";
import { defaultCurrencyValue } from "store/defaultValues";
import { CoinModel } from "store/models/coin";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

import ChartStore from "./ChartStore";
import { requestChart } from "./requestChart";
import { requestCoin } from "./requestCoin";

export default class CoinStore implements ILocalStore {
  private _id: string;
  private _coin: CoinModel | undefined;
  meta: Meta = Meta.initial;
  currencyStore;
  chartStore;
  constructor(id: string | undefined) {
    this._id = id || "";
    this.chartStore = new ChartStore(this._id);
    this.currencyStore = new DropdownStore();
    this.currencyStore.dropdownValues = defaultCurrencyValue;
    makeAutoObservable(this, {
      fetch: action.bound,
    });
  }

  async fetch() {
    await this.currencyStore.fetch();

    if (this.meta !== Meta.loading && this.meta !== Meta.success) {
      this.meta = Meta.loading;
      if (this._id) {
        const { isError, data } = await requestCoin(this._id);
        if (isError) {
          this.meta = Meta.error;
          return;
        }
        runInAction(() => {
          this.meta = Meta.success;
          this._coin = data;
        });
      }
    }

    await this.chartStore.fetch(this.currencyStore.dropdownValues.key);
  }

  get coin() {
    return this._coin;
  }

  destroy(): void {}
}
