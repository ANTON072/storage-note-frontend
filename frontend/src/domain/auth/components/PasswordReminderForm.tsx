import { Stack, Text } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { MailField } from "./MailField";
import { SubmitButton } from "./SubmitButton";

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
    </Stack>
  );
};
