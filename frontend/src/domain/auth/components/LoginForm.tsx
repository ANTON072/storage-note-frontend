import { Link as RouterLink } from "react-router-dom";

import { VStack, Link, Stack, Text, Divider } from "@chakra-ui/react";



import { GoogleLoginButton } from "./GoogleLoginButton";
import { MailField } from "./MailField";
import { PasswordField } from "./PasswordField";
import { SubmitButton } from "./SubmitButton";

import type { PasswordLoginValues } from "../types";
import type { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<PasswordLoginValues>;
  isLoading: boolean;
  flashComponent?: React.ReactNode;
  reSendMailComponent?: React.ReactNode;
  onGoogleLogin: () => void;
};

export const LoginForm = ({
  form,
  isLoading,
  flashComponent,
  reSendMailComponent,
  onGoogleLogin,
}: Props) => {
  return (
    <>
      <GoogleLoginButton onClick={onGoogleLogin}>
        Googleでログイン
      </GoogleLoginButton>
      <Divider my={5} />
      <Stack spacing={4}>
        {flashComponent}
        {reSendMailComponent}
        <MailField form={form} fieldName="email" />
        <PasswordField form={form} fieldName="password" />
        <Stack spacing={10} pt={2}>
          <SubmitButton isLoading={isLoading}>ログイン</SubmitButton>
        </Stack>
        <VStack>
          <Link as={RouterLink} to="/auth/password-reminder" color={"blue.500"}>
            パスワードをお忘れの方
          </Link>
          <Text>
            アカウントをお持ちでない方{" "}
            <Link as={RouterLink} to="/auth/register" color={"blue.500"}>
              新規登録
            </Link>
          </Text>
        </VStack>
      </Stack>
    </>
  );
};
