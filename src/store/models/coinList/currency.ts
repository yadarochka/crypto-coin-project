import "components/UI/Dropdown/types";

export const normalizeCurrency = (currencyData: string[]) =>
  currencyData.map((el) => {
    return {
      key: el,
      value: `Market - ${el.toUpperCase()}`,
    };
  });
