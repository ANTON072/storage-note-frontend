import {
  Box,
  VStack,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

import { SubmitButton } from "@/domain/auth/components/SubmitButton";
import type { PasswordLoginValues } from "@/domain/auth/types";

import type { UseFormReturn } from "react-hook-form";

type Props = {
  mailForm: UseFormReturn<PasswordLoginValues>;
  onMailSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isMailLoading: boolean;
  onPasswordChange: () => Promise<void>;
};

export const ChangeLoginForm = ({
  mailForm,
  onMailSubmit,
  isMailLoading,
  onPasswordChange,
}: Props) => {
  const mailErrors = mailForm.formState.errors;

  return (
    <VStack spacing={10}>
      <Box width={`100%`}>
        <form onSubmit={onMailSubmit}>
          <VStack spacing={5}>
            <FormControl isInvalid={!!mailErrors.email}>
              <FormLabel>新しいメールアドレス</FormLabel>
              <Input type="email" required {...mailForm.register("email")} />
              <FormErrorMessage>
                {mailErrors.email && mailErrors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!mailErrors.password}>
              <FormLabel>現在のパスワード</FormLabel>
              <Input
                type="password"
                required
                {...mailForm.register("password")}
              />
              <FormErrorMessage>
                {mailErrors.password && mailErrors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Box mt={3}>
              <SubmitButton isLoading={isMailLoading}>
                メールアドレスを変更する
              </SubmitButton>
            </Box>
          </VStack>
        </form>
      </Box>
      <Box width={`100%`}>
        <Button variant={`link`} onClick={onPasswordChange}>
          パスワードの再設定
        </Button>
      </Box>
    </VStack>
  );
};
