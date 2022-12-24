import { apiUrls } from "app/api/apiUrls";
import axios from "axios";

import { CoinApiModel, CoinModel } from "store/models/coin/coin";
import { ApiResp } from "utils/apiTypes";

// из-за ошибки с импортами пока нормалайз полежит здесь

export const normalizeCoinApiModel = (raw: CoinApiModel): CoinModel => {
  return {
    id: raw.id,
    symbol: raw.symbol,
    name: raw.name,
    marketCapRank: raw.market_cap_rank,
    marketCap: {
      ...raw.market_data.market_cap,
    },
    fullyDilutedValuation: {
      ...raw.market_data.fully_diluted_valuation,
    },
    totalSupply: raw.market_data.total_supply,
    maxSupply: raw.market_data.max_supply,
    circulatingSupply: raw.market_data.circulating_supply,
    image: { ...raw.image },
    currentPrice: {
      ...raw.market_data.current_price,
    },
    priceChange24hInCurrency: {
      ...raw.market_data.price_change_24h_in_currency,
    },
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
