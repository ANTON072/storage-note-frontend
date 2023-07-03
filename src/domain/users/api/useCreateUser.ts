import { useCallback, useState } from "react";

import { FirebaseError } from "firebase/app";

import { useFirebaseStorage, appApi, API_BASE_URL } from "@/domain/application";

import type { AppUser } from "../types";

export const useCreateUser = () => {
  const [isLoading, setLoading] = useState(false);

  const { uploadImage } = useFirebaseStorage();

  const onCreateUser = useCallback(
    async (values: AppUser) => {
      try {
        setLoading(true);
        const photoUrl = await uploadImage({
          url: values.photoUrl,
          namePrefix: "user_icon",
        });
        await appApi.post<AppUser>(`${API_BASE_URL}/v1/user`, {
          name: values.name,
          photoUrl,
        });
      } catch (error) {
        console.error(error);
        if (error instanceof FirebaseError) {
          //
        } else {
          //
        }
      } finally {
        setLoading(false);
      }
    },
    [uploadImage]
  );

  return { onCreateUser, isLoading };
};
