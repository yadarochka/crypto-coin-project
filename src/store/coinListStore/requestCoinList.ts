import { apiUrls } from "config/apiUrls";

import { axiosWithError } from "utils/axiosWithError";

export const requestCoinList = (
  currency: string,
  perPage: number,
  page: number,
  id?: string,
  category?: string
) =>
  axiosWithError(
    apiUrls.coinGecko.getAll(currency, perPage, page, id, category)
  );

export const requestCoinListCurrency = () =>
  axiosWithError(apiUrls.coinGecko.getCurrency());

export const requestCategoryList = () =>
  axiosWithError(apiUrls.coinGecko.getCategoryList());
