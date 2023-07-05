import { Navigate } from "react-router-dom";

import { FormBody, FormFrame, FormTitle } from "@/domain/auth";

import { useUser } from "..";
import { CreateUserFormContainer } from "../containers/CreateUserFormContainer";

export const CreateUserRoute = () => {
  const { user } = useUser();

  if (user) {
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
