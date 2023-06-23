import { PageHead } from "@/domain/application";

import { PasswordReminderContainer } from "../containers/PasswordReminderContainer";

export const PasswordReminderRoute = () => {
  return (
    <>
      <PageHead title={`パスワード再発行`} />
      <PasswordReminderContainer />
    </>
  );
};
