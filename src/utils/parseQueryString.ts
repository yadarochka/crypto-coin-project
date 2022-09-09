export type Params = {
  [search: string]: string;
};
/**
 * Получает query-строку, возвращает объект параметров
 *
 * Пример:
 * принимает "?search=10?currency=usd",
 * возвращает {
 *      search: 10,
 *      currency: usd,
 * }
 */

// upd: русские символы при передаче в search params превращаются в крокозябры, поэтому лучше подключить библиотеку и удалить эту функцию
export const parseQueryString = (search: string) => {
  const param: Params = {};
  search = search.startsWith("?") ? search.slice(1) : search;
  const arr = search.split("&").map((str) => str.split("="));
  for (let i = 0; i < arr.length; i++) {
    param[arr[i][0]] = arr[i][1];
  }
  return param;
};
