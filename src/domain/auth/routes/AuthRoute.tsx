import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

import type { AppState } from "@/domain/application";

export const AuthRoute = () => {
  const appUser = useSelector((state: AppState) => state.user.appUser);
  const firebaseUser = useSelector((state: AppState) => state.user.firebase);

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
