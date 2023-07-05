import { useEffect, useState } from "react";

import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import type { AppState } from "@/domain/application";
import { API_BASE_URL, appApi } from "@/domain/application";

import { setAppUser } from "..";

import type { AppUser } from "../types";
import type { AxiosError } from "axios";

export const useUser = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const idToken = useSelector((state: AppState) => state.auth.idToken);

  const appUser = useSelector((state: AppState) => state.user.appUser);

  const dispatch = useDispatch();

  const { data, error, isLoading, isSuccess, isError, refetch } = useQuery<
    AppUser,
    AxiosError
  >(
    `user`,
    async () => {
      const response = await appApi.get<AppUser>(`${API_BASE_URL}/v1/user`);

      return response.data;
    },
    {
      retry: false,
      enabled: !appUser,
    }
  );

  useEffect(() => {
    setLoggedIn(!!idToken);
  }, [idToken]);

  useEffect(() => {
    if (data) {
      dispatch(setAppUser(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    user: appUser,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch,
    isLoggedIn,
  };
};
