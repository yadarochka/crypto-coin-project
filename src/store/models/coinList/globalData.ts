export type GlobalDataApiModel = {
  data: {
    active_cryptocurrencies: number;
    market_cap_change_percentage_24h_usd: number;
  };
};

export type GlobalDataModel = {
  activeCryptocurrencies: number;
  marketCapChangePercentage24hUsd: number;
};

export const normalizeGlobalDataModel = (
  raw: GlobalDataApiModel
): GlobalDataModel => ({
  activeCryptocurrencies: raw.data.active_cryptocurrencies,
  marketCapChangePercentage24hUsd:
    raw.data.market_cap_change_percentage_24h_usd,
});
