import { useQuery } from "react-query";

import { API_BASE_URL, appApi } from "@/domain/application";

import type { StockResponse } from "../types";

type Args = {
  storageId: string;
  stockId: number;
  isEnabled?: boolean;
};

export const useStockQuery = ({
  storageId,
  stockId,
  isEnabled = true,
}: Args) => {
  const query = useQuery(
    [`stock`, stockId],
    async () => {
      const { data } = await appApi.get<StockResponse>(
        `${API_BASE_URL}/v1/storages/${storageId}/stocks/${stockId}`
      );

      return data;
    },
    {
      enabled: isEnabled,
    }
  );

  return { query };
};
