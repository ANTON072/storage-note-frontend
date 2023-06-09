import { useForm } from "react-hook-form";
import { FormBody } from "../components/FormBody";
import { FormTitle } from "../components/FormTitle";
import { PasswordReminderForm } from "../components/PasswordReminderForm";
import { useMutation } from "react-query";
import { sendPasswordResetEmail } from "firebase/auth";

import {
  FlashMessage,
  firebaseGetAuth,
  localizeFirebaseErrorMessage,
} from "@/domain/application";
import { AlertStatus } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const PasswordReminderContainer = () => {
  const auth = firebaseGetAuth();

  const [flashMessage, setFlashMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState<AlertStatus | undefined>();

  const reminderForm = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (values: { email: string }) => {
      return sendPasswordResetEmail(auth, values.email);
    },
    onSuccess: () => {
      setFlashMessage("再設定の手続きをメールしました");
      setAlertStatus("success");
    },
  });

  useEffect(() => {
    if (error instanceof Error) {
      setFlashMessage(localizeFirebaseErrorMessage(error.message));
      setAlertStatus("error");
    }
  }, [error, isError]);

  return (
    <>
      <FormTitle title="パスワード再発行" />
      <FormBody>
        <PasswordReminderForm
          onSubmit={(values) => {
            mutate(values);
          }}
          form={reminderForm}
          isLoading={isLoading}
          flashComponent={
            <FlashMessage status={alertStatus} description={flashMessage} />
          }
        />
      </FormBody>
    </>
  );
};
