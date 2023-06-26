import { useCallback, useEffect } from "react";

import { sendPasswordResetEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import {
  firebaseGetAuth,
  localizeFirebaseErrorMessage,
  useFlashMessage,
} from "@/domain/application";

import { FormBody } from "../components/FormBody";
import { FormTitle } from "../components/FormTitle";
import { PasswordReminderForm } from "../components/PasswordReminderForm";



export const PasswordReminderContainer = () => {
  const auth = firebaseGetAuth();

  const { FlashMessage, setFlashMessageState } = useFlashMessage();

  const form = useForm<{ email: string }>({
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

  const handleSubmit = useCallback(
    (values: { email: string }) => {
      mutate(values);
    },
    [mutate]
  );

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
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <PasswordReminderForm
            form={form}
            isLoading={isLoading}
            flashComponent={<FlashMessage />}
          />
        </form>
      </FormBody>
    </>
  );
};
