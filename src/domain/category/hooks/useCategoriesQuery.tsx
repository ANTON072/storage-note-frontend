import { useQuery } from "react-query";

import { API_BASE_URL, appApi } from "@/domain/application";

import type { CategoryResponse } from "../types";

export const useCategoriesQuery = (storageId: string) => {
  const query = useQuery(
    ["categories", storageId],
    async () => {
      const { data } = await appApi.get<CategoryResponse[]>(
        `${API_BASE_URL}/v1/storages/${storageId}/categories`
      );

      return data;
    },
    {
      enabled: !!storageId,
    }
  );

  return {
    categoriesQuery: query,
  };
};
