import { PageHead } from "@/domain/application";

import { LoginFormContainer } from "../containers/LoginFormContainer";

export const LoginRoute = () => {
  return (
    <>
      <PageHead title={`ログイン`} />
      <LoginFormContainer />
    </>
  );
};
