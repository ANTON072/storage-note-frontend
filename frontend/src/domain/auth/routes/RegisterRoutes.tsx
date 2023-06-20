import { RegisterFormContainer } from "../containers/RegisterFormContainer";
import { PageHead } from "@/domain/application";

export const RegisterRoutes = () => {
  return (
    <>
      <PageHead title={`新規登録`} />
      <RegisterFormContainer />
    </>
  );
};
