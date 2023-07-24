import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import {
  firebaseGetAuth,
  localizeFirebaseErrorMessage,
  useFlashMessage,
  useGoogleLogin,
  useReSendMail,
} from "@/domain/application";

import { FormBody } from "../components/FormBody";
import { FormTitle } from "../components/FormTitle";
import { LoginForm } from "../components/LoginForm";
import { passwordLoginSchema } from "../types";

import type { PasswordLoginValues } from "../types";
import type { AuthError } from "firebase/auth";

export const LoginFormContainer = () => {
  const auth = firebaseGetAuth();

  const { onGoogleLogin } = useGoogleLogin();

  const toast = useToast();

  const navigate = useNavigate();

  const form = useForm<PasswordLoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(passwordLoginSchema),
  });

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

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (values: PasswordLoginValues) => {
      return signInWithEmailAndPassword(auth, values.email, values.password);
    },
    onSuccess: ({ user }) => {
      if (user.emailVerified) {
        // ログイン成功
        toast({
          title: "ログインしました",
        });
        navigate("/");
      } else {
        setFlashMessageState({
          description: "メールアドレスが認証されていません",
          status: "error",
        });
        setShowResendMailButton(true);
      }
    },
    onError: (error: AuthError) => {
      console.error(error);
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
  }, [error, isError, setFlashMessageState]);

  return (
    <>
      <FormTitle title="ログイン" />
      <FormBody>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <LoginForm
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
