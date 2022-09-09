export type CoinApiModel = {
  id: string;
  symbol: string;
  name: string;

  image: {
    [size: string]: string;
  };
  market_data: {
    current_price: {
      [usd: string]: number;
    };
    price_change_24h_in_currency: {
      [usd: string]: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_24h_in_currency: {
      [usd: string]: number;
    };
  };
};

export type CoinModel = {
  id: string;
  symbol: string;
  name: string;

  image: {
    [size: string]: string;
  };
  currentPrice: {
    [usd: string]: number;
  };
  priceChange24hInCurrency: {
    [usd: string]: number;
  };
  priceChangePercentage24h: number;
  priceChangePercentage24hInCurrency: {
    [usd: string]: number;
  };
};
