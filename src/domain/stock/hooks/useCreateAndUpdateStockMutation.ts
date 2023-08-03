import { useMutation } from "react-query";

import { API_BASE_URL, appApi, useFirebaseStorage } from "@/domain/application";

import type { StockFormValues, StockResponse } from "../types";

type Args = {
  isEdit: boolean;
  onSuccess?: (values: StockResponse) => void;
  onError?: (error: unknown) => void;
  storageId: string;
  stockId?: number;
};

export const useCreateAndUpdateStockMutation = ({
  isEdit,
  onError,
  onSuccess,
  storageId,
  stockId,
}: Args) => {
  const { uploadImage } = useFirebaseStorage();

  const mutation = useMutation({
    mutationFn: async (values: StockFormValues) => {
      const imageUrl = await uploadImage({
        url: values.imageUrl || "",
        directory: `/images/storage/${storageId}`,
      });

      if (isEdit && stockId) {
        return appApi.patch(
          `${API_BASE_URL}/v1/storages/${storageId}/stocks/${stockId}`,
          {
            stock: {
              ...values,
              imageUrl,
            },
          }
        );
      }

      return appApi.post(`${API_BASE_URL}/v1/storages/${storageId}/stocks`, {
        stock: {
          ...values,
          imageUrl,
        },
      });
    },
    onSuccess: (res) => {
      if (onSuccess) onSuccess(res.data);
    },
    onError: (error) => {
      console.error(error);
      if (onError) onError(error);
    },
  });

  return { mutation };
};
