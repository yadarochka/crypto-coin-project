import axios from "axios";
import { apiUrls } from "config/apiUrls";

import { ApiResp } from "utils/apiTypes";

export const requestChart = async (
  name: string,
  currency: string,
  days?: string
): Promise<ApiResp<number[][]>> => {
  try {
    const response = await axios(apiUrls.coinGecko.getChart(name, currency));
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
