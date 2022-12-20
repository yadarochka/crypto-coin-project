/**
 * Функция округления числа
 * @param number Число, которое хотим округлить
 * @param decimal Количество знаков после запятой
 * @returns Округленное число
 */

type DecimalType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const rounding = (number: number, decimal: DecimalType = 2): number => {
  return Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
};
