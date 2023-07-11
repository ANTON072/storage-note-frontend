import { Navigate } from "react-router-dom";

import { FormBody, FormFrame, FormTitle } from "@/domain/auth";

import { useUser } from "..";
import { CreateUserFormContainer } from "../containers/CreateUserFormContainer";

export const CreateUserRoute = () => {
  const { appUser, firebaseUser } = useUser();

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
