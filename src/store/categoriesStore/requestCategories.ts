import { apiUrls } from "app/api/apiUrls";

import { axiosWithError } from "utils/axiosWithError";

export const requestCategories = () =>
  axiosWithError(apiUrls.coinGecko.getCategoties());
