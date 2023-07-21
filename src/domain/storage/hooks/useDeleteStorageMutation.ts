import { useMutation } from "react-query";

import { appApi, API_BASE_URL } from "@/domain/application";

import type { StorageResponse } from "../types";

type Args = {
  onSuccess?: (values: StorageResponse) => void;
  onError?: (error: unknown) => void;
  storageId?: string;
};

export const useDeleteStorageMutation = ({
  storageId,
  onError,
  onSuccess,
}: Args) => {
  const mutation = useMutation({
    mutationFn: async () => {
      return appApi.delete<StorageResponse>(
        `${API_BASE_URL}/v1/storages/${storageId}`
      );
    },
    onSuccess: (res) => {
      if (onSuccess) onSuccess(res.data);
    },
    onError: (error) => {
      console.error(error);
      if (onError) onError(error);
    },
  });

  return {
    mutation,
  };
};
