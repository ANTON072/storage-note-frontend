import { omit } from "lodash";
import { useMutation } from "react-query";

import { appApi, useFirebaseStorage, API_BASE_URL } from "@/domain/application";

import type { Storage, StorageResponse } from "../types";

type Args = {
  isEdit: boolean;
  onSuccess?: (values: StorageResponse) => void;
  onError?: (error: unknown) => void;
  storageId?: string;
};

export const useCreateAndUpdateStorageMutation = ({
  isEdit,
  storageId,
  onError,
  onSuccess,
}: Args) => {
  const { uploadImage } = useFirebaseStorage();

  const mutation = useMutation({
    mutationFn: async (values: Storage) => {
      const imageUrl = await uploadImage({
        url: values.imageUrl || "",
        namePrefix: "storage_",
      });
      const memberIds = values.members?.map((member) => member.name) || [];

      if (isEdit) {
        return appApi.patch<StorageResponse>(
          `${API_BASE_URL}/v1/storages/${storageId}`,
          {
            storage: {
              ...omit(values, "members"),
              members: memberIds,
              imageUrl,
            },
          }
        );
      }

      return appApi.post<StorageResponse>(`${API_BASE_URL}/v1/storages`, {
        storage: {
          ...omit(values, "members"),
          members: memberIds,
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

  return {
    mutation,
  };
};
