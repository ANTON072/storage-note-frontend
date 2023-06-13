import { VStack, Checkbox, Link, Stack, Text } from "@chakra-ui/react";
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
      <VStack>
        <Link as={RouterLink} to="/auth/password-reminder" color={"blue.500"}>
          パスワードをお忘れの方
        </Link>
        <Text>
          アカウントをお持ちでない方{" "}
          <Link as={RouterLink} to="/auth/register" color={"blue.500"}>
            アカウントを作成する
          </Link>
        </Text>
      </VStack>
    </Stack>
  );
};
