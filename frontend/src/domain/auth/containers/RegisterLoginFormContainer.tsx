import { useMutation } from "react-query";
import { useCallback, useEffect } from "react";
import { UseFormReturn, useForm } from "react-hook-form";

import {
  firebaseGetAuth,
  localizeFirebaseErrorMessage,
  useFlashMessage,
} from "@/domain/application";
import { yupResolver } from "@hookform/resolvers/yup";

import { PasswordLoginValues, passwordLoginSchema } from "../types";
import { FormTitle } from "../components/FormTitle";
import { FormBody } from "../components/FormBody";
import { useReSendMail } from "../hooks/useReSendMail";

type ChildComponentProps = {
  form: UseFormReturn<PasswordLoginValues>;
  isLoading: boolean;
  flashComponent: React.ReactNode;
  reSendMailComponent: React.ReactNode;
};

type Props = {
  title: string;
  mutation: ReturnType<typeof useMutation>;
  children: (props: ChildComponentProps) => React.ReactNode;
};

export const RegisterLoginFormContainer = ({
  title,
  mutation,
  children,
}: Props) => {
  const auth = firebaseGetAuth();

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

  const handleSubmit = useCallback(
    (values: PasswordLoginValues) => {
      setShowResendMailButton(false);
      mutation.mutate(values);
    },
    [mutation, setShowResendMailButton]
  );

  useEffect(() => {
    if (mutation.error instanceof Error) {
      setFlashMessageState({
        description: localizeFirebaseErrorMessage(mutation.error.message),
        status: "error",
      });
    }
  }, [mutation.error, setFlashMessageState]);

  return (
    <>
      <FormTitle title={title} />
      <FormBody>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {children({
            form,
            isLoading: mutation.isLoading,
            flashComponent: <FlashMessage />,
            reSendMailComponent: <ResendMailButton />,
          })}
        </form>
      </FormBody>
    </>
  );
};
