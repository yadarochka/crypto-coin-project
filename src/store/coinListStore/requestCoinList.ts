import axios from "axios";
import { apiUrls } from "config/apiUrls";

import { CoinListModel, normalizeCurrency } from "store/models";
import { normalizeCoinListApiModel } from "store/models";
import { ApiResp } from "utils/apiTypes";

import { Option } from "components/UI/Dropdown";

export const requestCoinList = async (
  vs_currency: string,
  perPage: number,
  page: number
): Promise<ApiResp<CoinListModel[]>> => {
  try {
    const response = await axios(
      apiUrls.coinGecko.getAll(vs_currency, perPage, page)
    );
    return {
      isError: false,
      data: response.data.map(normalizeCoinListApiModel),
    };
  } catch (e) {
    return {
      isError: true,
      data: null,
    };
  }
};

export const requestCoinListCurrency = async (): Promise<ApiResp<Option[]>> => {
  try {
    const response = await axios(apiUrls.coinGecko.getCurrency());
    return {
      isError: false,
      data: normalizeCurrency(response.data),
    };
  } catch (e) {
    return {
      isError: true,
      data: null,
    };
  }
};
