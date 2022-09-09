import { apiUrls } from "config/apiUrls";
import { CoinApiModel, CoinModel } from "store/models/coin/coin";
import { ApiResp } from "utils/apiTypes";
import axios from "axios";

// из-за ошибки с импортами пока нормалайз полежит здесь

export const normalizeCoinApiModel = (raw: CoinApiModel): CoinModel => {
  return {
    id: raw.id,
    symbol: raw.id,
    name: raw.name,

    image: { ...raw.image },
    currentPrice: {
      ...raw.market_data.current_price,
    },
    priceChange24hInCurrency: {
      ...raw.market_data.price_change_percentage_24h_in_currency,
    },
    priceChangePercentage24h: raw.market_data.price_change_percentage_24h,
    priceChangePercentage24hInCurrency: {
      ...raw.market_data.price_change_percentage_24h_in_currency,
    },
  };
};

export const requestCoin = async (id: string): Promise<ApiResp<CoinModel>> => {
  try {
    const response = await axios(apiUrls.coinGecko.getCoin(id));
    return {
      isError: false,
      data: normalizeCoinApiModel(response.data),
    };
  } catch (e) {
    return {
      isError: true,
      data: null,
    };
  }
};
