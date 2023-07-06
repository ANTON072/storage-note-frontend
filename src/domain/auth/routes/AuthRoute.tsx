import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "@/domain/users";

export const AuthRoute = () => {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return null;
  }

  // ユーザーIDが未設定な場合はユーザー作成ページへ遷移
  if (!user?.name) {
    return <Navigate to={`/create-user`} />;
  }

  if (error) {
    // const statusCode = error.response?.status;
    // if (!statusCode) {
    //   return <div>システムエラー</div>;
    // }
    // if (statusCode < 500) {
    //   onLogout().then(() => {
    //     return <Navigate to={`/auth/login`} />;
    //   });
    // } else {
    //   return <div>システムエラー</div>;
    // }
    return <div>システムエラー</div>;
  }

  return <Outlet />;
};
