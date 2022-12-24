import { apiUrls } from "app/api/apiUrls";
import axios from "axios";

import { ApiResp } from "utils/apiTypes";

export const requestChart = async (
  name: string,
  currency: string,
  days: string
): Promise<ApiResp<number[][]>> => {
  try {
    const response = await axios(
      apiUrls.coinGecko.getChart(name, currency, days)
    );
    return {
      isError: false,
      data: response.data,
    };
  } catch (e) {
    return {
      isError: true,
      data: null,
    };
  }
};
