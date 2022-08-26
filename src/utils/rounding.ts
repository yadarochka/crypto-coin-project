/**
 * Функция округления числа
 * @param number Число, которое хотим округлить
 * @param decimal Количество знаков после запятой
 * @returns Округленное число
 */
export const rounding = (number: number, decimal: number = 2): number => {
  return Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
};
