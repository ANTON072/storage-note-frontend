import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import type { AppState } from "@/domain/application";
import { FormBody, FormFrame, FormTitle } from "@/domain/auth";

import { CreateUserFormContainer } from "../containers/CreateUserFormContainer";

export const CreateUserRoute = () => {
  const appUser = useSelector((state: AppState) => state.user.appUser);
  const firebaseUser = useSelector((state: AppState) => state.user.firebase);

  if (!firebaseUser || !firebaseUser.emailVerified) {
    return <Navigate to={`/auth/login`} />;
  }

  if (appUser) {
    return <Navigate to={`/`} />;
  }

  return (
    <FormFrame>
      <FormTitle title="ユーザー情報登録" />
      <FormBody>
        <CreateUserFormContainer />
      </FormBody>
    </FormFrame>
  );
};
