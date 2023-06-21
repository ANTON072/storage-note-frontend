import { useMemo } from "react";

import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import type { AppState } from "@/domain/application";
import { MOCK_API_BASE_URL, appApi } from "@/domain/application";

import type { AppUser } from "../types";
import type { AxiosError } from "axios";

export const useUser = () => {
  const firebaseUser = useSelector((state: AppState) => state.user.firebase);

  const { data, error, isLoading, isSuccess, isError } = useQuery<
    AppUser,
    AxiosError
  >(
    `user`,
    async () => {
      const response = await appApi.get<AppUser>(
        `${MOCK_API_BASE_URL}/v1/user`
      );

      return response.data;
    },
    {
      retry: false,
    }
  );

  const user = useMemo(() => {
    return {
      userId: data?.userId,
      notificationEmail: data?.notificationEmail,
      photoURL: firebaseUser?.photoURL,
    };
  }, [data?.notificationEmail, data?.userId, firebaseUser?.photoURL]);

  return {
    user,
    isLoading,
    isError,
    isSuccess,
    error,
  };
};
