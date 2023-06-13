import { LoginFormContainer } from "../containers/LoginFormContainer";
import { PageHead } from "@/domain/application";

export const LoginRoutes = () => {
  return (
    <>
      <PageHead title={`ログイン`} />
      <LoginFormContainer />
    </>
  );
};
