import { makeAutoObservable, runInAction, toJS } from "mobx";

import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

import { requestChart } from "./requestChart";

export default class ChartStore implements ILocalStore {
  private _meta: Meta = Meta.initial;
  chart: number[][] = [];
  idCoin;
  private _time = {
    options: [
      {
        key: "1",
        value: "1 D",
      },
      {
        key: "7",
        value: "1 W",
      },
      {
        key: "14",
        value: "2 W",
      },
      {
        key: "30",
        value: "1 M",
      },
      {
        key: "90",
        value: "3 M",
      },
      {
        key: "180",
        value: "6 M",
      },
      {
        key: "max",
        value: "All",
      },
    ],
    value: {
      key: "1",
      value: "1 H",
    },
  };

  constructor(id: string) {
    this.idCoin = id;
    makeAutoObservable(this);
  }
  get meta() {
    return this._meta;
  }
  set meta(newMeta) {
    this._meta = newMeta;
  }
  get time() {
    return this._time;
  }
  get timeValues() {
    return this._time.value;
  }
  set timeValues(newValue) {
    this._time.value = newValue;
  }

  async fetch(currency: string) {
    if (this.meta !== Meta.loading) {
      this.meta = Meta.loading;
      this.chart = [];
      if (this.idCoin) {
        /* захардкодил */
        const { isError, data } = await requestChart(
          this.idCoin,
          currency,
          this.time.value.key
        );
        if (isError) {
          this.meta = Meta.error;
          return;
        }
        runInAction(() => {
          this.chart = data;
          this.meta = Meta.success;
        });
      }
    }
  }
  destroy() {}
}
