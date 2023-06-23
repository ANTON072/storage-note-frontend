import { useQuery } from "react-query";

import { MOCK_API_BASE_URL, appApi } from "@/domain/application";

import type { AppUser } from "../types";
import type { AxiosError } from "axios";

export const useUser = () => {
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

  return {
    user: data,
    isLoading,
    isError,
    isSuccess,
    error,
  };
};
