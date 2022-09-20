import { makeAutoObservable, runInAction } from "mobx";

import {
  GlobalDataModel,
  normalizeGlobalDataModel,
} from "store/models/coinList/globalData";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

import { requestGlobalInfo } from "./requestCoinList";

export default class GlobalDataStore implements ILocalStore {
  private _meta: Meta = Meta.initial;
  globalData: GlobalDataModel = {
    marketCapChangePercentage24hUsd: 0,
    activeCryptocurrencies: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  get meta() {
    return this._meta;
  }

  set meta(newMeta: Meta) {
    this._meta = newMeta;
  }

  async fetch() {
    if (this.meta === Meta.loading || this.meta === Meta.success) {
      return;
    }
    this.meta = Meta.loading;

    const { isError, data } = await requestGlobalInfo();

    if (isError) {
      this._meta = Meta.error;
      return;
    }
    runInAction(() => {
      this._meta = Meta.success;
      this.globalData = normalizeGlobalDataModel(data);
    });
  }

  destroy(): void {}
}
