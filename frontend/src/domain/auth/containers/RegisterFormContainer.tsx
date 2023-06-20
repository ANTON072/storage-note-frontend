import { useCallback, useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import {
  firebaseGetAuth,
  localizeFirebaseErrorMessage,
  useFlashMessage,
} from "@/domain/application";


import { FormBody } from "../components/FormBody";
import { FormTitle } from "../components/FormTitle";
import { RegisterForm } from "../components/RegisterForm";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import { useReSendMail } from "../hooks/useReSendMail";
import { passwordLoginSchema } from "../types";

import type { PasswordLoginValues} from "../types";
import type {
  AuthError} from "firebase/auth";

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
