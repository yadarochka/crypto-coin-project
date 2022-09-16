export type CategoryApiModel = {
  category_id: string;
  name: string;
};

export type CategoryModel = {
  key: string;
  value: string;
};

export type CategoryListOptionsModel = {
  options: CategoryModel[];
};

export type CategoryListModel = {
  options: CategoryModel[];
  value: CategoryModel;
};

export const normalizeCategoryModel = (
  raw: CategoryApiModel[]
): CategoryModel[] => {
  const normalizeData: CategoryModel[] = [
    {
      key: "all",
      value: "All categories",
    },
    ...raw.map((categoreItem) => {
      return {
        key: categoreItem.category_id,
        value: categoreItem.name,
      };
    }),
  ];
  return normalizeData;
};
