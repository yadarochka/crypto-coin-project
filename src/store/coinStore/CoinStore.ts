import { CoinModel } from "@store/models/coin";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";

import { requestChart } from "./requestChart";
import { requestCoin } from "./requestCoin";

export default class CoinStore implements ILocalStore {
  _id: string | undefined;
  _coin: CoinModel | undefined;
  _chart: number[][] | undefined = [];
  meta: Meta = Meta.initial;
  constructor(id: string | undefined) {
    this._id = id;
    makeAutoObservable(this, {
      _coin: observable,
      _chart: observable,
      fetch: action.bound,
      chart: computed,
    });
  }

  async fetch() {
    if (this.meta === Meta.loading) return;
    this.meta = Meta.loading;
    if (this._id) {
      const { isError, data } = await requestCoin(this._id);
      if (isError) {
        return;
      }
      runInAction(() => {
        this._coin = data;
      });
    }
    if (this._coin) {
      /* захардкодил */
      const { isError, data } = await requestChart(this._coin.id, "usd");
      if (isError) {
        return;
      }
      runInAction(() => {
        this.chart = data;
      });
    }
  }
  get chart() {
    return this._chart;
  }

  set chart(newData) {
    this._chart = newData;
  }

  get coin() {
    return this._coin;
  }

  destroy(): void {}
}
