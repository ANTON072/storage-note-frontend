import { Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";

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

export const RegisterForm = ({
  isLoading,
  flashComponent,
  reSendMailComponent,
  form,
}: Props) => {
  return (
    <Stack spacing={4}>
      {flashComponent}
      {reSendMailComponent}
      <MailField form={form} fieldName="email" />
      <PasswordField form={form} fieldName="password" />
      <Stack spacing={10} pt={2}>
        <SubmitButton isLoading={isLoading}>アカウントを作成</SubmitButton>
      </Stack>
      <Stack pt={6}>
        <Text align={"center"} fontSize="xs">
          すでにアカウントをお持ちの方{" "}
          <Link as={RouterLink} to="/auth/login" color={"blue.400"}>
            ログイン
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
};
