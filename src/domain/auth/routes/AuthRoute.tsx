import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "@/domain/users";

export const AuthRoute = () => {
  const { user, isLoading, isError } = useUser();

  if (isLoading) {
    return null;
  }

  // ユーザーIDが未設定な場合はユーザー作成ページへ遷移
  if (!user?.userId) {
    return <Navigate to={`/create-user`} />;
  }

  if (isError) {
    // TODO: システムエラー画面の表示
  }

  return <Outlet />;
};
