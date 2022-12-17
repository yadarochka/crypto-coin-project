import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { NotFound } from "widgets/NotFound";
import { PageLoader } from "widgets/PageLoader";

import React from "react";
import { Link } from "react-router-dom";

import { CategoriesStore } from "store/categoriesStore/categoriesStore";
import { requestCategories } from "store/categoriesStore/requestCategories";
import { normalizeCategoriesModel } from "store/models/categories/categoriesModel";
import { Meta } from "utils/meta";
import { useAsync } from "utils/useAsync";
import { useLocalStore } from "utils/useLocalStore";

import styles from "./CategoriesPage.module.scss";

const CategoriesPage = () => {
  const store = useLocalStore(() => new CategoriesStore());

  const fetch = async () => {
    store.meta = Meta.loading;
    const { isError, data } = await requestCategories();
    if (isError) {
      store.meta = Meta.error;
      return;
    }

    store._categories = normalizeCategoriesModel(data);
    store.meta = Meta.success;
  };

  useAsync(fetch, []);

  const categoryItems = store.categories.map((category) => (
    <Link
      to={`/?category=${category.id}`}
      key={category.id}
      className={styles.categoryItem}
    >
      <span className={styles.name}>{category.name}</span>
      <span>{Math.floor(category.marketCap)}$</span>
      <div className={styles.imgGroup}>
        {category.topCoins.map((imgSrc) => (
          <img
            key={imgSrc}
            className={styles.img}
            src={imgSrc}
            alt="Coin logo"
          />
        ))}
      </div>
    </Link>
  ));
  if (store.meta === Meta.error) {
    return <NotFound />;
  }
  return (
    <main className={styles.categoriesPage}>
      <h2 className={styles.title}>Categories</h2>
      {store.meta === Meta.success && (
        <div className={styles.categoriesList}>{categoryItems}</div>
      )}

      {store.meta === Meta.loading && <PageLoader />}
    </main>
  );
};

export default observer(CategoriesPage);
