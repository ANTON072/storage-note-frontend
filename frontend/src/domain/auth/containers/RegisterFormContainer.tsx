import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  AuthError,
} from "firebase/auth";
import { useMutation } from "react-query";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  firebaseGetAuth,
  localizeFirebaseErrorMessage,
  useFlashMessage,
} from "@/domain/application";
import { yupResolver } from "@hookform/resolvers/yup";

import { RegisterForm } from "../components/RegisterForm";
import { PasswordLoginValues, passwordLoginSchema } from "../types";
import { FormTitle } from "../components/FormTitle";
import { FormBody } from "../components/FormBody";
import { useReSendMail } from "../hooks/useReSendMail";
import { useGoogleLogin } from "../hooks/useGoogleLogin";

export const RegisterFormContainer = () => {
  const auth = firebaseGetAuth();

  const form = useForm<PasswordLoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(passwordLoginSchema),
  });

  const { onGoogleLogin } = useGoogleLogin();

  const { FlashMessage, setFlashMessageState } = useFlashMessage();

  const { ResendMailButton, setShowResendMailButton } = useReSendMail({
    auth,
    onSuccess: () => {
      setFlashMessageState({
        description: "確認メールを送信しました",
        status: "success",
      });
    },
    onError: () => {
      setFlashMessageState({
        description: "確認メールの送信に失敗しました",
        status: "error",
      });
    },
  });

  const { mutate, isLoading, error } = useMutation({
    mutationFn: (values: PasswordLoginValues) => {
      return createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
    },
    onSuccess: ({ user }) => {
      // 確認メールの送信
      sendEmailVerification(user);
      setFlashMessageState({
        description: "確認メールを送信しました",
        status: "success",
      });
    },
    onError: (error: AuthError) => {
      console.log(error.message);
      // ユーザーがすでに存在する場合
      if (auth.currentUser) {
        setShowResendMailButton(true);
      }
    },
  });

  const handleSubmit = useCallback(
    (values: PasswordLoginValues) => {
      setShowResendMailButton(false);
      mutate(values);
    },
    [mutate, setShowResendMailButton]
  );

  useEffect(() => {
    if (error instanceof Error) {
      setFlashMessageState({
        description: localizeFirebaseErrorMessage(error.message),
        status: "error",
      });
    }
  }, [error, setFlashMessageState]);

  return (
    <>
      <FormTitle title="新規登録" />
      <FormBody>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <RegisterForm
            form={form}
            isLoading={isLoading}
            flashComponent={<FlashMessage />}
            reSendMailComponent={<ResendMailButton />}
            onGoogleLogin={onGoogleLogin}
          />
        </form>
      </FormBody>
    </>
  );
};
