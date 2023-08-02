import { useCallback, useMemo } from "react";

import { useCategoriesQuery } from "..";

export const useCategory = (storageId: string) => {
  const { categoriesQuery } = useCategoriesQuery(storageId);

  const categories = useMemo(
    () => categoriesQuery.data || [],
    [categoriesQuery.data]
  );

  const findCategory = useCallback(
    (categoryId: number) => {
      const category = categories.find(
        (category) => category.id === categoryId
      );

      return category;
    },
    [categories]
  );

  return { findCategory };
};
