import { ILocalStore } from "@utils/useLocalStore";
import { computed, makeAutoObservable, observable } from "mobx";

export default class Search implements ILocalStore {
  _search: string | undefined = "";

  constructor() {
    makeAutoObservable(this, {
      _search: observable,
      search: computed,
    });
  }
  destroy(): void {}

  get search() {
    return this._search;
  }

  set search(newSearch) {
    this._search = newSearch;
  }
}
