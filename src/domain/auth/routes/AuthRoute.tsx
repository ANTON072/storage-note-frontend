import { Navigate, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setError } from "@/domain/application";
import { useUser } from "@/domain/users";

export const AuthRoute = () => {
  const { user, isLoading, error } = useUser();

  const dispatch = useDispatch();

  if (isLoading) {
    return null;
  }

  // ユーザーIDが未設定な場合はユーザー作成ページへ遷移
  if (!user?.name) {
    return <Navigate to={`/create-user`} />;
  }

  if (error) {
    dispatch(setError(error));
  }

  return <Outlet />;
};
