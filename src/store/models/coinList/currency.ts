import "@components/UI/Dropdown/types";

export const normalizeCurrency = (currencyData: string[]) => {
  return currencyData.map((el) => {
    return {
      key: el,
      value: `Market - ${el.toUpperCase()}`,
    };
  });
};
