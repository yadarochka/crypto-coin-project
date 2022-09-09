import { Options } from "@components/UI/Dropdown";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import { makeAutoObservable, runInAction } from "mobx";

import { requestCoinListCurrency } from "./requestCoinList";

type DropDownType = {
  options: Options[];
  value: Options;
};

export default class DropdownStore implements ILocalStore {
  meta: Meta = Meta.initial;
  _dropDown: DropDownType = {
    options: [],
    value: {
      key: "",
      value: "",
    },
  };

  constructor() {
    makeAutoObservable(this);
    this.meta = Meta.initial;
  }

  async fetch(): Promise<void> {
    if (this.meta === Meta.loading) return;

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

  get dropdown() {
    return this._dropDown;
  }

  get dropdownOptions() {
    return this._dropDown.options;
  }

  get dropdownValues() {
    return this._dropDown.value;
  }

  set dropdownValues({ key, value }: Options) {
    this._dropDown.value = { key: key, value: value };
  }

  set dropdownOptions(newOption: Options[]) {
    this._dropDown.options = newOption;
  }
}
