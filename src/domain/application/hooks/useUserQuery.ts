import { useState } from "react";

import { useQuery } from "react-query";

import type { AppUser } from "@/domain/users/types";

import { API_BASE_URL, appApi } from "..";

type Props = {
  onSuccess?: (user: AppUser) => void;
  onError?: (error: unknown) => void;
};

export const useUserQuery = ({ onSuccess, onError }: Props = {}) => {
  const [isFetch, setFetch] = useState(false);

  const userQuery = useQuery(
    "user",
    async () => {
      const { data } = await appApi.get<AppUser>(`${API_BASE_URL}/v1/user`);

      return data;
    },
    {
      onSuccess: (user) => {
        if (onSuccess) {
          onSuccess(user);
        }
      },
      onError: (error) => {
        if (onError) {
          onError(error);
        }
      },
      enabled: isFetch,
    }
  );

  return { userQuery, setFetch, isFetch };
};
