import { action, makeAutoObservable, observable, runInAction } from "mobx";

import { defaultCategoryValue } from "store/defaultValues";
import {
  CategoryModel,
  normalizeCategoryModel,
} from "store/models/coinList/category";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

import { requestCategoryList } from "./requestCoinList";

export default class CategoryStore implements ILocalStore {
  _meta: Meta = Meta.initial;
  options: CategoryModel[] = [];
  _value: CategoryModel = defaultCategoryValue;

  constructor() {
    makeAutoObservable(this, {
      _value: observable,
      options: observable,
      fetch: action,
    });
    this._meta = Meta.initial;
  }

  set value(newValue) {
    this._value = newValue;
  }
  get value() {
    return this._value;
  }

  get meta() {
    return this._meta;
  }

  set meta(newMeta: Meta) {
    this._meta = newMeta;
  }

  async fetch(): Promise<void> {
    if (this.meta === Meta.loading || this.meta === Meta.success) {
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
      this.options = normalizeCategoryModel(data);
    });
  }

  destroy() {}
}
