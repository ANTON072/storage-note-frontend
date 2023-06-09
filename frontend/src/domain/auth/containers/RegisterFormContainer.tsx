import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  AuthError,
} from "firebase/auth";
import { useMutation } from "react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@chakra-ui/react";
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

export const RegisterFormContainer = () => {
  const auth = firebaseGetAuth();

  const { FlashMessage, setFlashMessageState } = useFlashMessage();

  const form = useForm<PasswordLoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(passwordLoginSchema),
  });

  const [isShowResendMail, setShowResendMail] = useState(false);

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
        setShowResendMail(true);
      }
    },
  });

  const handleReSendMail = useCallback(async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      setFlashMessageState({
        description: "確認メールを再送信しました",
        status: "success",
      });
      setShowResendMail(false);
    }
  }, [auth.currentUser, setFlashMessageState]);

  const renderReSendMailComponent = useMemo(() => {
    if (!isShowResendMail) return null;

    return <Button onClick={handleReSendMail}>確認メールを再送信する</Button>;
  }, [handleReSendMail, isShowResendMail]);

  const handleSubmit = useCallback(
    (values: PasswordLoginValues) => {
      setShowResendMail(false);
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
  }, [error, setFlashMessageState]);

  return (
    <>
      <FormTitle title="新規会員登録" />
      <FormBody>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <RegisterForm
            form={form}
            isLoading={isLoading}
            flashComponent={<FlashMessage />}
            reSendMailComponent={renderReSendMailComponent}
          />
        </form>
      </FormBody>
    </>
  );
};
