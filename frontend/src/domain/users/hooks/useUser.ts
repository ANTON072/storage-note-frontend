import { useQuery } from "react-query";

import { getAppUser } from "..";

import type { AppUser } from "../types";
import type { AxiosError } from "axios";

export const useUser = () => {
  const { data, error, isLoading, isSuccess, isError } = useQuery<
    AppUser,
    AxiosError
  >(`user`, getAppUser, {
    retry: false,
  });

  return {
    user: data,
    isLoading,
    isError,
    isSuccess,
    error,
  };
};
