import classNames from "classnames";
import { observer } from "mobx-react-lite";
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
      className={classNames(
        styles["display-flex"],
        styles["justify-content-sb"],
        styles["mb-2"],
        styles["align-items-center"],
        styles["category-item"]
      )}
    >
      <span className={styles.name}>{category.name}</span>
      <span>{Math.floor(category.marketCap)}$</span>
      <span>
        {category.topCoins.map((imgSrc) => (
          <img
            key={imgSrc}
            className={styles.img}
            src={imgSrc}
            alt="Coin logo"
          />
        ))}
      </span>
    </Link>
  ));
  return (
    <div>
      <h2 className={classNames(styles["page-title"], styles["display-block"])}>
        Categories
      </h2>
      {store.meta === Meta.loading && <PageLoader />}
      {store.meta === Meta.success && categoryItems}
      {store.meta === Meta.error && (
        <div className={styles["text-align-center"]}>Error</div>
      )}
    </div>
  );
};

export default observer(CategoriesPage);
