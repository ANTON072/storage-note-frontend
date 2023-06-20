import { RegisterFormContainer } from "../containers/RegisterFormContainer";
import { PageHead } from "@/domain/application";

export const RegisterRoutes = () => {
  return (
    <>
      <PageHead title={`アカウントを作成`} />
      <RegisterFormContainer />
    </>
  );
};
