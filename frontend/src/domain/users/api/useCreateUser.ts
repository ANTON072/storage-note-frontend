import { useCallback, useState } from "react";

import { FirebaseError } from "firebase/app";

import {
  useFirebaseStorage,
  appApi,
  MOCK_API_BASE_URL,
} from "@/domain/application";

import type { AppUser } from "../types";

export const useCreateUser = () => {
  const [isLoading, setLoading] = useState(false);

  const { uploadImage } = useFirebaseStorage();

  const onCreateUser = useCallback(
    async (values: AppUser) => {
      try {
        setLoading(true);
        const photoUrl = await uploadImage({
          url: values.photoURL,
          namePrefix: "user_icon",
        });
        const user = await appApi.post<AppUser>(
          `${MOCK_API_BASE_URL}/v1/user`,
          {
            userId: values.userId,
            photoUrl,
          }
        );
        console.log("user", user);
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
