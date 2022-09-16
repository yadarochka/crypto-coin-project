export type CoinListModel = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  sparkline7d: {
    price: number[];
  };
};

export type CoinListApiModel = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
};

export const normalizeCoinListApiModel = (
  raw: CoinListApiModel[]
): CoinListModel[] => {
  return raw.map((rawEl) => {
    return {
      id: rawEl.id,
      name: rawEl.name,
      image: rawEl.image,
      symbol: rawEl.symbol,
      currentPrice: rawEl.current_price,
      priceChange24h: rawEl.price_change_24h,
      priceChangePercentage24h: rawEl.price_change_percentage_24h,
      sparkline7d: {
        price: rawEl.sparkline_in_7d.price,
      },
    };
  });
};
