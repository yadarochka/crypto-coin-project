import { action, makeAutoObservable, runInAction } from "mobx";

import {
  CategoriesModel,
  normalizeCategoriesModel,
} from "store/models/categories/categoriesModel";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

import { requestCategories } from "./requestCategories";

export class CategoriesStore implements ILocalStore {
  _meta: Meta;
  _categories: CategoriesModel[];
  constructor() {
    makeAutoObservable(this);
    this._meta = Meta.initial;
    this._categories = [];
  }
  get meta() {
    return this._meta;
  }

  set meta(newMeta) {
    this._meta = newMeta;
  }
  get categories() {
    return this._categories;
  }

  destroy() {}
}
