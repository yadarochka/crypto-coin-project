import { Params, parseQueryString } from "utils/parseQueryString";
import { makeAutoObservable } from "mobx";

export default class QueryParamsStore {
  _search = "";
  _currency = "";
  _params: Params = {
    search: this._search,
    currency: this._currency,
  };

  constructor() {
    makeAutoObservable(this);
  }

  get search() {
    return this._search;
  }

  set params(newParams: Params) {
    this._params = newParams;
  }

  getParam(): Params;

  getParam(key: string): string;

  getParam(key?: string): Params | string {
    if (key) return this._params[key];
    return this._params;
  }

  setSearch(search: string) {
    if (this.search !== search) {
      this._search = search;
      this.params = parseQueryString(search);
    }
  }
}
