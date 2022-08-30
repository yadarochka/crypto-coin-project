import { useState } from "react";

interface UsePaginationProps {
  /** Количество контента на странице */
  contentPerPage: number;
  /** Количество контента */
  count: number;
}

interface UsePaginationReturn {
  /** Текущая страница */
  page: number;
  /** Всего страниц */
  totalPages: number;
  /** Первый индекс для метода slice */
  firstContentIndex: number;
  /** Первый индекс для метода slice */
  lastContentIndex: number;
  /** Функция перехода на страницу вперёд */
  nextPage: () => void;
  /** Функция перехода на страницу назад */
  prevPage: () => void;
  /** Функция перехода на определенную страницу */
  setPage: (page: number) => void;
}

type UsePagination = (arg0: UsePaginationProps) => UsePaginationReturn;

const usePagination: UsePagination = ({ contentPerPage, count }) => {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(count / contentPerPage);

  const lastContentIndex = page * contentPerPage;

  const firstContentIndex = lastContentIndex - contentPerPage;

  const changePage = (direction: boolean) => {
    setPage((state) => {
      if (direction) {
        if (state === pageCount) {
          return state;
        }
        return state + 1;
      } else {
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };
  const setPageSAFE = (num: number) => {
    if (num > pageCount) {
      setPage(pageCount);
    } else if (num < 1) {
      setPage(1);
    } else {
      setPage(num);
    }
  };
  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
  };
};
export default usePagination;
