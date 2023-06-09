import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  AuthError,
} from "firebase/auth";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  firebaseGetAuth,
  localizeFirebaseErrorMessage,
  useFlashMessage,
} from "@/domain/application";

import { FormBody } from "../components/FormBody";
import { FormTitle } from "../components/FormTitle";
import { LoginForm } from "../components/LoginForm";
import { PasswordLoginValues, passwordLoginSchema } from "../types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export const LoginFormContainer = () => {
  const auth = firebaseGetAuth();

  const { FlashMessage, setFlashMessageState } = useFlashMessage();

  const [isShowResendMail, setShowResendMail] = useState(false);

  const loginForm = useForm<PasswordLoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(passwordLoginSchema),
  });

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (values: PasswordLoginValues) => {
      return signInWithEmailAndPassword(auth, values.email, values.password);
    },
    onSuccess: ({ user }) => {
      if (user.emailVerified) {
        // ログイン成功
        console.log("user", user);
      } else {
        setFlashMessageState({
          description: "メールアドレスが認証されていません",
          status: "error",
        });
        setShowResendMail(true);
      }
    },
    onError: (error: AuthError) => {
      console.error(error);
    },
  });

  const handleReSendMail = useCallback(async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      setShowResendMail(false);
      setFlashMessageState({
        description: "確認メールを送信しました",
        status: "success",
      });
    }
  }, [auth.currentUser, setFlashMessageState]);

  useEffect(() => {
    if (error instanceof Error) {
      setFlashMessageState({
        description: localizeFirebaseErrorMessage(error.message),
        status: "error",
      });
    }
  }, [error, isError, setFlashMessageState]);

  const renderReSendMailComponent = useMemo(() => {
    if (!isShowResendMail) return null;

    return <Button onClick={handleReSendMail}>確認メールを再送信する</Button>;
  }, [handleReSendMail, isShowResendMail]);

  return (
    <>
      <FormTitle title="ログイン" />
      <FormBody>
        <LoginForm
          form={loginForm}
          onSubmit={(values: PasswordLoginValues) => {
            mutate(values);
          }}
          isLoading={isLoading}
          flashComponent={<FlashMessage />}
          reSendMailComponent={renderReSendMailComponent}
        />
      </FormBody>
    </>
  );
};
