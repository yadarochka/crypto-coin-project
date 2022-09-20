import { apiUrls } from "config/apiUrls";

import { axiosWithError } from "utils/axiosWithError";

export const requestCategories = () =>
  axiosWithError(apiUrls.coinGecko.getCategoties());
