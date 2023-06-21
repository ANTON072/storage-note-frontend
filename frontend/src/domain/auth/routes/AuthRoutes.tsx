import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useUser } from "@/domain/users";

export const AuthRoutes = () => {
  const location = useLocation();

  const { user, error, isLoading, isError } = useUser();

  const statusCode = error?.response?.status;

  if (user.userId) {
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
