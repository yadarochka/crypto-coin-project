import { makeAutoObservable, runInAction } from "mobx";

import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

import { Option } from "components/UI/Dropdown";

import { requestCoinListCurrency } from "./requestCoinList";

type DropDownType = {
  options: Option[];
  value: Option;
};

export default class DropdownStore implements ILocalStore {
  _meta: Meta = Meta.initial;
  _dropDown: DropDownType = {
    options: [],
    value: {
      key: "",
      value: "",
    },
  };

  constructor() {
    makeAutoObservable(this);
    this._meta = Meta.initial;
  }

  get meta() {
    return this._meta;
  }

  set meta(newMeta: Meta) {
    this._meta = newMeta;
  }

  get dropdown() {
    return this._dropDown;
  }

  get dropdownOptions() {
    return this._dropDown.options;
  }

  get dropdownValues() {
    return this._dropDown.value;
  }

  set dropdownValues(value: Option) {
    this._dropDown.value = value;
  }

  set dropdownOptions(newOption: Option[]) {
    this._dropDown.options = newOption;
  }

  async fetch(): Promise<void> {
    if (this.meta === Meta.loading) {
      return;
    }

    this.meta = Meta.loading;

    const { isError, data } = await requestCoinListCurrency();

    if (isError) {
      this.meta = Meta.error;
      return;
    }
    runInAction(() => {
      this.meta = Meta.success;
      this.dropdownOptions = data;
    });
  }

  destroy() {}
}
