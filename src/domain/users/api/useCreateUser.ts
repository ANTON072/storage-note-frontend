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
          url: values.photoUrl || "",
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

  const onUpdateUser = useCallback(
    async (values: AppUser) => {
      setLoading(true);
      try {
        setLoading(true);
        const photoUrl = await uploadImage({
          url: values.photoUrl || "",
          namePrefix: "user_icon",
        });
        await appApi.patch<Pick<AppUser, "photoUrl">>(
          `${API_BASE_URL}/v1/user`,
          {
            photoUrl,
          }
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // TODO: APIエラー時はFirebaseにアップロードされた画像を消したい
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    },
    [uploadImage]
  );

  return { onCreateUser, onUpdateUser, isLoading };
};
