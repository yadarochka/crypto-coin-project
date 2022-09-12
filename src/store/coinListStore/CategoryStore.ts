import {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
  override,
  runInAction,
} from "mobx";

import {
  CategoryListModel,
  CategoryModel,
} from "store/models/coinList/category";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

import { requestCategoryList } from "./requestCoinList";

export default class CategoryStore implements ILocalStore {
  _meta: Meta = Meta.initial;
  options: CategoryModel[] = [];
  value = {
    value: "",
    key: "",
  };

  constructor() {
    makeAutoObservable(this, {
      options: observable,
      value: observable,
      fetch: action,
    });
    this._meta = Meta.initial;
  }

  get meta() {
    return this._meta;
  }

  set meta(newMeta: Meta) {
    this._meta = newMeta;
  }

  async fetch(): Promise<void> {
    if (this.meta === Meta.loading) {
      return;
    }

    this.meta = Meta.loading;

    const { isError, data } = await requestCategoryList();

    if (isError) {
      this.meta = Meta.error;
      return;
    }
    runInAction(() => {
      this.meta = Meta.success;
      this.options = data.options;
    });
  }

  destroy() {}
}
