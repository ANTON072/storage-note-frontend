import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  AuthError,
} from "firebase/auth";
import { useMutation } from "react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertStatus, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import {
  FlashMessage,
  firebaseGetAuth,
  localizeFirebaseErrorMessage,
} from "@/domain/application";
import { yupResolver } from "@hookform/resolvers/yup";

import { RegisterForm } from "../components/RegisterForm";
import { PasswordLoginValues, passwordLoginSchema } from "../types";
import { FormTitle } from "../components/FormTitle";
import { FormBody } from "../components/FormBody";

export const RegisterFormContainer = () => {
  const auth = firebaseGetAuth();

  const registerForm = useForm<PasswordLoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(passwordLoginSchema),
  });

  const [flashMessage, setFlashMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState<AlertStatus | undefined>();
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
      setFlashMessage("確認メールを送信しました");
      setAlertStatus("success");
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
      setFlashMessage("確認メールを再送信しました");
      setAlertStatus("success");
      setShowResendMail(false);
    }
  }, [auth.currentUser]);

  const renderFlashComponent = useMemo(() => {
    if (alertStatus && flashMessage) {
      return <FlashMessage status={alertStatus} description={flashMessage} />;
    }

    return null;
  }, [alertStatus, flashMessage]);

  const renderReSendMailComponent = useMemo(() => {
    if (!isShowResendMail) return null;

    return <Button onClick={handleReSendMail}>確認メールを再送信する</Button>;
  }, [handleReSendMail, isShowResendMail]);

  useEffect(() => {
    if (error instanceof Error) {
      setFlashMessage(localizeFirebaseErrorMessage(error.message));
      setAlertStatus("error");
    }
  }, [error]);

  return (
    <>
      <FormTitle title="新規会員登録" />
      <FormBody>
        <RegisterForm
          form={registerForm}
          onSubmit={(values: PasswordLoginValues) => {
            setShowResendMail(false);
            mutate(values);
          }}
          isLoading={isLoading}
          flashComponent={renderFlashComponent}
          reSendMailComponent={renderReSendMailComponent}
        />
      </FormBody>
    </>
  );
};
