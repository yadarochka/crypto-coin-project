import { parseQueryString } from "@utils/parseQueryString";
import { Params } from "@utils/parseQueryString";
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

  getParam(): Params;
  getParam(key: string): string;

  // Implementation signature
  getParam(key?: string): unknown {
    if (key) return this._params[key];
    return this._params;
  }

  setSearch(search: string) {
    if (this._search !== search) {
      this._search = search;
      this._params = parseQueryString(search);
    }
  }
}
