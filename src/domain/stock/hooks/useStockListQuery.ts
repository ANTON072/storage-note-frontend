import { useQuery } from "react-query";

import { API_BASE_URL, appApi } from "@/domain/application";

import type { StockResponse } from "../types";

export const useStockListQuery = (storageId?: string) => {
  const query = useQuery(
    ["stock", storageId],
    async () => {
      const { data } = await appApi.get<StockResponse[]>(
        `${API_BASE_URL}/v1/storages/${storageId}/stocks`
      );

      return data;
    },
    {
      enabled: !!storageId,
    }
  );

  return {
    stockListQuery: query,
  };
};
