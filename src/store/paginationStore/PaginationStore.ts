import {
  action,
  computed,
  makeAutoObservable,
  observable,
  reaction,
} from "mobx";

import { ILocalStore } from "utils/useLocalStore";

export default class PaginationStore implements ILocalStore {
  /** Текущая страница */
  _page: number = 1;
  /** Количество контента на странице */
  contentPerPage: number = 1;
  /** Последний индекс для метода slice */
  lastContentIndex = this._page * this.contentPerPage;
  /** Первый индекс для метода slice */
  firstContentIndex = this.lastContentIndex - this.contentPerPage;

  /** Всего контента */
  _count: number = 1;
  /** Всего страниц */
  _pageCount = Math.ceil(this._count / this.contentPerPage);

  constructor(contentPerPage: number) {
    this.contentPerPage = contentPerPage;
    makeAutoObservable(this, {
      _count: observable,
      count: computed,
      _setPage: action.bound,
      nextPage: action.bound,
      prevPage: action.bound,
      setPage: action.bound,
    });
  }

  paginationCountReaction = reaction(
    () => this.count,
    () => {
      this.lastContentIndex = this._page * this.contentPerPage;
      this.firstContentIndex = this.lastContentIndex - this.contentPerPage;
      this._pageCount = Math.ceil(this._count / this.contentPerPage);
    }
  );

  paginationPageReaction = reaction(
    () => this.page,
    () => {
      this.lastContentIndex = this._page * this.contentPerPage;
      this.firstContentIndex = this.lastContentIndex - this.contentPerPage;
    }
  );

  /** Функция перехода на определенную страницу */
  _setPage = (direction: boolean) => {
    if (direction) {
      if (this._page === this._pageCount) {
        return this._page + 1;
      }
      return this._page;
    } else {
      if (this._page === 1) {
        return this._page;
      }
      return this._page - 1;
    }
  };
  /** Функция перехода на страницу вперёд */
  nextPage() {
    this._setPage(true);
  }
  /** Функция перехода на страницу назад */
  prevPage() {
    this._setPage(false);
  }

  get page() {
    return this._page;
  }

  set page(num: number) {
    this._page = num;
  }

  setPage(num: number) {
    if (num > this._pageCount) {
      this._page = this._pageCount;
    } else if (num < 1) {
      this._page = 1;
    } else {
      this._page = num;
    }
  }

  set count(num: number) {
    this._count = num;
  }
  get count() {
    return this._count;
  }

  get pageCount() {
    return this._pageCount;
  }

  destroy() {
    this.paginationPageReaction();
    this.paginationCountReaction();
  }
}
