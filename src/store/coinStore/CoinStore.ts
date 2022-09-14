import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";
import { storeAnnotation } from "mobx/dist/internal";

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
  chartStore;
  constructor(id: string | undefined) {
    this._id = id || "";
    this.chartStore = new ChartStore(this._id);
    makeAutoObservable(this, {
      fetch: action.bound,
    });
  }

  async fetch() {
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

    this.chartFetch();
  }

  async chartFetch() {
    await this.chartStore.fetch();
  }

  get coin() {
    return this._coin;
  }

  destroy(): void {}
}
