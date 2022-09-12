import axios from "axios";
import { apiUrls } from "config/apiUrls";

import { CoinListModel, normalizeCurrency } from "store/models";
import { normalizeCoinListApiModel } from "store/models";
import {
  CategoryListModel,
  CategoryModel,
  normalizeCategoryModel,
} from "store/models/coinList/category";
import { ApiResp } from "utils/apiTypes";

import { Option } from "components/UI/Dropdown";

export const axiosWithError = async (
  normalize: any,
  ...args: Parameters<typeof axios>
) => {
  try {
    const response = await axios(...args);
    return {
      isError: false,
      data: normalize(response.data),
    };
  } catch (error) {
    console.error("request error", error);

    return {
      isError: true,
      data: null,
    };
  }
};

// export const request = (currency, perPage, page, id, category, normalize) =>
//   axiosWithError(
//     apiUrls.coinGecko.getAll(currency, perPage, page, id, category),
//     normalize
//   );

export const requestCoinList = async (
  currency: string,
  perPage: number,
  page: number,
  id?: string,
  category?: string
): Promise<ApiResp<CoinListModel[]>> => {
  try {
    const response = await axios(
      apiUrls.coinGecko.getAll(currency, perPage, page, id, category)
    );
    return {
      isError: false,
      data: normalizeCoinListApiModel(response.data),
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

export const requestCategoryList = async (): Promise<
  ApiResp<CategoryListModel>
> => {
  try {
    const response = await axios(apiUrls.coinGecko.getCategoryList());
    return {
      isError: false,
      data: normalizeCategoryModel(response.data),
    };
  } catch (e) {
    return {
      isError: true,
      data: null,
    };
  }
};
