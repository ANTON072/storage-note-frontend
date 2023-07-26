import { useQuery } from "react-query";

import { appApi } from "@/domain/application";

import type { StorageResponse } from "../types";

export const useStorageQuery = (storageId: string) => {
  const query = useQuery(
    ["storage", storageId],
    async () => {
      const { data } = await appApi.get<StorageResponse>(
        `storages/${storageId}`
      );

      return data;
    },
    {
      enabled: !!storageId,
    }
  );

  return {
    storageQuery: query,
  };
};
