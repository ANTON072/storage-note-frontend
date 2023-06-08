import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  AuthError,
} from "firebase/auth";
import { useMutation } from "react-query";
import { useCallback, useMemo, useState } from "react";
import { AlertStatus, Button } from "@chakra-ui/react";

import {
  FlashMessage,
  firebaseGetAuth,
  localizeFirebaseErrorMessage,
} from "@/domain/application";

import { RegisterForm } from "../components/RegisterForm";
import { PasswordLoginValues } from "../types";
import { FormTitle } from "../components/FormTitle";
import { FormBody } from "../components/FormBody";

export const RegisterFormContainer = () => {
  const auth = firebaseGetAuth();

  const [isAlreadyExist, setAlreadyExist] = useState(false);
  const [isResendMail, setResendMail] = useState(false);

  const { mutate, isLoading, isError, isSuccess, error } = useMutation({
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
    },
    onError: (error: AuthError) => {
      console.log(error.message);
      // ユーザーがすでに存在する場合
      if (auth.currentUser) {
        setAlreadyExist(true);
      }
    },
  });

  const handleReSendMail = useCallback(async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      setResendMail(true);
      setAlreadyExist(false);
    }
  }, [auth.currentUser]);

  const resultStatus: AlertStatus | undefined = useMemo(() => {
    if (isSuccess || isResendMail) return "success";
    if (isError) return "error";
    return undefined;
  }, [isError, isResendMail, isSuccess]);

  const flashMessage = useMemo(() => {
    if (isSuccess || isResendMail) return "確認メールを送信しました";
    if (error instanceof Error)
      return localizeFirebaseErrorMessage(error.message);
    return undefined;
  }, [error, isResendMail, isSuccess]);

  const renderFlashComponent = useMemo(() => {
    if (resultStatus && flashMessage) {
      return <FlashMessage status={resultStatus} description={flashMessage} />;
    }

    return null;
  }, [flashMessage, resultStatus]);

  const renderReSendMailComponent = useMemo(() => {
    if (!isAlreadyExist) return null;

    return <Button onClick={handleReSendMail}>確認メールを再送信する</Button>;
  }, [handleReSendMail, isAlreadyExist]);

  return (
    <>
      <FormTitle title="新規会員登録" />
      <FormBody>
        <RegisterForm
          onSubmit={(values: PasswordLoginValues) => {
            setResendMail(false);
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
