export type CategoriesModelApi = {
  id: string;
  name: string;
  market_cap: number;
  top_3_coins: string[];
};

export type CategoriesModel = {
  id: string;
  name: string;
  marketCap: number;
  topCoins: string[];
};

export const normalizeCategoriesModel = (
  raw: CategoriesModelApi[]
): CategoriesModel[] =>
  raw.map((rawEl) => ({
    id: rawEl.id,
    name: rawEl.name,
    marketCap: rawEl.market_cap,
    topCoins: rawEl.top_3_coins,
  }));
