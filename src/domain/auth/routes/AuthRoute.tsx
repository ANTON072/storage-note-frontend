import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "@/domain/users";

export const AuthRoute = () => {
  const { appUser, firebaseUser } = useUser();

  // Firebaseユーザーがない or メール未認証の場合はログイン画面へ遷移
  if (!firebaseUser || !firebaseUser.emailVerified) {
    return <Navigate to={`/auth/login`} />;
  }

  // ユーザー情報が無い場合はユーザー作成画面へ遷移
  if (!appUser) {
    return <Navigate to={`/create-user`} />;
  }

  return <Outlet />;
};
