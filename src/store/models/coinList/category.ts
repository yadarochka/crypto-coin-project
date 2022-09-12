export type CategoryApiModel = {
  category_id: string;
  name: string;
};

export type CategoryModel = {
  key: string;
  value: string;
};

export type CategoryListModel = {
  options: CategoryModel[];
};

export const normalizeCategoryModel = (
  raw: CategoryApiModel[]
): CategoryListModel => {
  return {
    options: [
      { key: "all", value: "All categories" },
      ...raw.map((categoreItem) => {
        return {
          key: categoreItem.category_id,
          value: categoreItem.name,
        };
      }),
    ],
  };
};
