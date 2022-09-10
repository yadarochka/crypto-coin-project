const coinGeckoApi = (endpoint: string): string =>
  `https://api.coingecko.com/api/v3/${endpoint}`;

export const apiUrls = {
  coinGecko: {
    getAll: (currency: string, perPage: number, page: number): string =>
      coinGeckoApi(
        `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${String(
          perPage
        )}&page=${String(page)}&sparkline=true`
      ),

    getCoin: (id: string): string =>
      coinGeckoApi(
        `coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
      ),

    getCurrency: (): string => coinGeckoApi(`simple/supported_vs_currencies`),

    getChart: (name: string, currency: string, days: string = "1") =>
      coinGeckoApi(`coins/${name}/ohlc?vs_currency=${currency}&days=${days}`),
  },
};
