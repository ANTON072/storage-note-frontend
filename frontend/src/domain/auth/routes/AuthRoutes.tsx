import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import type { AppState } from "@/domain/application";
import { setAppUser, useUser } from "@/domain/users";

export const AuthRoutes = () => {
  const location = useLocation();
  const appUser = useSelector((state: AppState) => state.user.appUser);
  const dispatch = useDispatch();

  const { user, error, isLoading, isError } = useUser();

  const statusCode = error?.response?.status;

  useEffect(() => {
    if (user) {
      dispatch(setAppUser(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (appUser.userId) {
    return <Outlet />;
  }

  if (isLoading) {
    return null;
  }

  if (location.pathname === "/app/settings") {
    return <Outlet />;
  }

  if (statusCode && statusCode === 404) {
    return <Navigate to={`/app/settings`} />;
  }

  if (isError) {
    // TODO: システムエラー画面の表示
  }

  return <Outlet />;
};
