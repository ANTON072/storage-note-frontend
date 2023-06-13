import { PasswordReminderContainer } from "../containers/PasswordReminderContainer";
import { PageHead } from "@/domain/application";

export const PasswordReminderRoutes = () => {
  return (
    <>
      <PageHead title={`パスワード再発行`} />
      <PasswordReminderContainer />
    </>
  );
};
