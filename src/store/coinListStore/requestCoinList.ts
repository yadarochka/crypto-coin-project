import { Options } from "components/UI/Dropdown";
import { apiUrls } from "config/apiUrls";
import { CoinListModel, normalizeCurrency } from "store/models";
import { normalizeCoinListApiModel } from "store/models";
import { ApiResp } from "utils/apiTypes";
import axios from "axios";

export const requestCoinList = async (
  vs_currency: string
): Promise<ApiResp<CoinListModel[]>> => {
  try {
    const response = await axios(apiUrls.coinGecko.getAll(vs_currency));
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

export const requestCoinListCurrency = async (): Promise<
  ApiResp<Options[]>
> => {
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
