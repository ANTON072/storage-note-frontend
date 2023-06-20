import { Link, Stack, Text, Divider } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";

import { PasswordLoginValues } from "../types";
import { MailField } from "./MailField";
import { PasswordField } from "./PasswordField";
import { SubmitButton } from "./SubmitButton";
import { GoogleLoginButton } from "./GoogleLoginButton";

type Props = {
  form: UseFormReturn<PasswordLoginValues>;
  isLoading: boolean;
  flashComponent?: React.ReactNode;
  reSendMailComponent?: React.ReactNode;
  onGoogleLogin: () => void;
};

export const RegisterForm = ({
  isLoading,
  flashComponent,
  reSendMailComponent,
  form,
  onGoogleLogin,
}: Props) => {
  return (
    <Stack spacing={4}>
      <GoogleLoginButton onClick={onGoogleLogin}>
        Googleで登録
      </GoogleLoginButton>
      <Divider my={5} />
      {flashComponent}
      {reSendMailComponent}
      <MailField form={form} fieldName="email" />
      <PasswordField form={form} fieldName="password" />
      <Stack spacing={10} pt={2}>
        <SubmitButton isLoading={isLoading}>登録する</SubmitButton>
      </Stack>
      <Stack pt={3}>
        <Text align={"center"}>
          すでにアカウントをお持ちの方{" "}
          <Link as={RouterLink} to="/auth/login" color={"blue.500"}>
            ログイン
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
};
