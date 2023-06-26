import { FormBody, FormFrame, FormTitle } from "@/domain/auth";

import { CreateUserFormContainer } from "../containers/CreateUserFormContainer";

export const CreateUserRoute = () => {
  return (
    <FormFrame>
      <FormTitle title="ユーザー情報登録" />
      <FormBody>
        <CreateUserFormContainer />
      </FormBody>
    </FormFrame>
  );
};
