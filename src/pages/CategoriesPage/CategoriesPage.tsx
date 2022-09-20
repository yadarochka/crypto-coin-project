import classNames from "classnames";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { CategoriesStore } from "store/categoriesStore/categoriesStore";
import { requestCategories } from "store/categoriesStore/requestCategories";
import { normalizeCategoriesModel } from "store/models/categories/categoriesModel";
import { useAsync } from "utils/useAsync";
import { useLocalStore } from "utils/useLocalStore";

import styles from "./CategoriesPage.module.scss";

const CategoriesPage = () => {
  const store = useLocalStore(() => new CategoriesStore());
  const navigate = useNavigate();

  const fetch = async () => {
    const { isError, data } = await requestCategories();

    console.log(data);

    if (isError) {
      return;
    }

    store._categories = normalizeCategoriesModel(data);
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
      {categoryItems}
    </div>
  );
};

export default observer(CategoriesPage);