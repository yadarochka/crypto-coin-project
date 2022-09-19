export type CoinApiModel = {
  id: string;
  symbol: string;
  name: string;

  image: {
    [size: string]: string;
  };
  market_cap_rank: number;
  market_data: {
    fully_diluted_valuation: {
      [usd: string]: number;
    };
    current_price: {
      [usd: string]: number;
    };
    market_cap: {
      [usd: string]: number;
    };
    price_change_24h_in_currency: {
      [usd: string]: number;
    };
    price_change_percentage_24h_in_currency: {
      [usd: string]: number;
    };
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
  };
};

export type CoinModel = {
  id: string;
  symbol: string;
  name: string;

  marketCapRank: number;
  totalSupply: number;
  maxSupply: number;
  circulatingSupply: number;
  fullyDilutedValuation: {
    [usd: string]: number;
  };

  image: {
    [size: string]: string;
  };
  marketCap: {
    [usd: string]: number;
  };
  currentPrice: {
    [usd: string]: number;
  };
  priceChange24hInCurrency: {
    [usd: string]: number;
  };
  priceChangePercentage24hInCurrency: {
    [usd: string]: number;
  };
};
