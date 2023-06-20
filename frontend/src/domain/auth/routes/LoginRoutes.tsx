import { PageHead } from "@/domain/application";

import { LoginFormContainer } from "../containers/LoginFormContainer";

export const LoginRoutes = () => {
  return (
    <>
      <PageHead title={`ログイン`} />
      <LoginFormContainer />
    </>
  );
};
