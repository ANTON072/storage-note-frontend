import { useCallback, useState } from "react";

import { useFirebaseStorage, appApi, API_BASE_URL } from "@/domain/application";

import type { AppUser } from "../types";

export const useCreateUser = () => {
  const [isLoading, setLoading] = useState(false);

  const { uploadImage } = useFirebaseStorage();

  const onCreateUser = useCallback(
    async (values: AppUser) => {
      setLoading(true);
      const photoUrl = await uploadImage({
        url: values.photoUrl || "",
        namePrefix: "user_icon",
      });
      await appApi
        .post<AppUser>(`${API_BASE_URL}/v1/user`, {
          name: values.name,
          photoUrl,
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [uploadImage]
  );

  const onUpdateUser = useCallback(
    async (values: AppUser) => {
      setLoading(true);
      const photoUrl = await uploadImage({
        url: values.photoUrl || "",
        namePrefix: "user_icon",
      });
      await appApi
        .patch<Pick<AppUser, "photoUrl">>(`${API_BASE_URL}/v1/user`, {
          photoUrl,
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [uploadImage]
  );

  return { onCreateUser, onUpdateUser, isLoading };
};
