import { computed, makeAutoObservable, observable, runInAction } from "mobx";

import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

export default class Search implements ILocalStore {
  _search: string | undefined = "";
  _meta: Meta = Meta.initial;

  constructor() {
    makeAutoObservable(this, {
      _search: observable,
      search: computed,
      _meta: observable,
      meta: computed,
    });
  }

  get search() {
    return this._search;
  }

  set search(newSearch) {
    this._search = newSearch;
  }

  get meta() {
    return this._meta;
  }

  set meta(newMeta: Meta) {
    this._meta = newMeta;
  }

  destroy(): void {}
}
