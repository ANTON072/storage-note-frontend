import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useUser } from "@/domain/users";

export const AuthRoutes = () => {
  const location = useLocation();

  const { user, isLoading, isError } = useUser();

  // 設定ページはuserIdが無くてもアクセスが可能
  if (location.pathname === "/app/settings") {
    return <Outlet />;
  }

  if (isLoading) {
    return null;
  }

  // 設定ページ以外のページはuserIdが必須
  if (!user?.userId) {
    return <Navigate to={`/app/settings`} />;
  }

  if (isError) {
    // TODO: システムエラー画面の表示
  }

  return <Outlet />;
};
