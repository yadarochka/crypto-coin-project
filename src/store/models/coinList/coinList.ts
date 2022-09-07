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
  raw: CoinListApiModel
): CoinListModel => ({
  id: raw.id,
  name: raw.name,
  image: raw.image,
  symbol: raw.symbol,
  currentPrice: raw.current_price,
  priceChange24h: raw.price_change_24h,
  priceChangePercentage24h: raw.price_change_percentage_24h,
  sparkline7d: {
    price: raw.sparkline_in_7d.price,
  },
});
