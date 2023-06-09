import { Link, Stack, Text } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

import { PasswordLoginValues } from "../types";
import { MailField } from "./MailField";
import { PasswordField } from "./PasswordField";
import { SubmitButton } from "./SubmitButton";

type Props = {
  form: UseFormReturn<PasswordLoginValues>;
  isLoading: boolean;
  flashComponent?: React.ReactNode;
  reSendMailComponent?: React.ReactNode;
};

export const LoginForm = ({
  form,
  isLoading,
  flashComponent,
  reSendMailComponent,
}: Props) => {
  return (
    <Stack spacing={4}>
      {flashComponent}
      {reSendMailComponent}
      <MailField form={form} fieldName="email" />
      <PasswordField form={form} fieldName="password" />
      <Stack spacing={10} pt={2}>
        <SubmitButton isLoading={isLoading}>ログイン</SubmitButton>
      </Stack>
      <Stack pt={6}>
        <Text fontSize="xs">
          <Link as={RouterLink} to="/auth/register" color={"blue.400"}>
            新規会員登録はこちら
          </Link>
        </Text>
        <Text fontSize="xs">
          <Link as={RouterLink} to="/auth/password-reminder" color={"blue.400"}>
            パスワードをお忘れの方
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
};
