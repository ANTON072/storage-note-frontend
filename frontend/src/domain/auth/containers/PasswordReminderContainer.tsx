import { useForm } from "react-hook-form";
import { FormBody } from "../components/FormBody";
import { FormTitle } from "../components/FormTitle";
import { PasswordReminderForm } from "../components/PasswordReminderForm";
import { useMutation } from "react-query";
import { sendPasswordResetEmail } from "firebase/auth";

import {
  firebaseGetAuth,
  localizeFirebaseErrorMessage,
  useFlashMessage,
} from "@/domain/application";
import { useEffect } from "react";

export const PasswordReminderContainer = () => {
  const auth = firebaseGetAuth();

  const { FlashMessage, setFlashMessageState } = useFlashMessage();

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
      setFlashMessageState({
        description: "再設定の手続きをメールしました",
        status: "success",
      });
    },
  });

  useEffect(() => {
    if (error instanceof Error) {
      setFlashMessageState({
        description: localizeFirebaseErrorMessage(error.message),
        status: "error",
      });
    }
  }, [error, isError, setFlashMessageState]);

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
          flashComponent={<FlashMessage />}
        />
      </FormBody>
    </>
  );
};
