import { Navigate, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setError } from "@/domain/application";
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

  // if (error) {
  //   dispatch(setError(error));
  // }

  return <Outlet />;
};
