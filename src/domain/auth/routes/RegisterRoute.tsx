import { PageHead } from "@/domain/application";

import { RegisterFormContainer } from "../containers/RegisterFormContainer";

export const RegisterRoute = () => {
  return (
    <>
      <PageHead title={`新規登録`} />
      <RegisterFormContainer />
    </>
  );
};
