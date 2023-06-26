import { Link as RouterLink } from "react-router-dom";

import { Link, Stack, Text } from "@chakra-ui/react";


import { MailField } from "./MailField";
import { SubmitButton } from "./SubmitButton";

import type { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<{ email: string }>;
  isLoading: boolean;
  flashComponent: React.ReactNode;
};

export const PasswordReminderForm = ({
  form,
  isLoading,
  flashComponent,
}: Props) => {
  return (
    <Stack spacing={4}>
      {flashComponent}
      <Text fontSize={`sm`}>
        アカウントに登録されたメールアドレスを入力してください
      </Text>
      <MailField form={form} fieldName="email" />
      <SubmitButton isLoading={isLoading}>再発行</SubmitButton>
      <Text mt={3} align={`center`}>
        <Link as={RouterLink} to="/auth/login" color={"blue.500"}>
          ログインに戻る
        </Link>
      </Text>
    </Stack>
  );
};
