import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Controller, UseFormReturn } from "react-hook-form";

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
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <>
      {flashComponent && <Box mb={4}>{flashComponent}</Box>}
      <Text fontSize={`sm`}>
        アカウントに登録されたメールアドレスを入力してください
      </Text>
      <Stack spacing={4} mt={4}>
        <FormControl id="email" isRequired isInvalid={!!errors.email}>
          <FormLabel>メールアドレス</FormLabel>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input type="email" {...field} />}
          />
        </FormControl>
        <Button
          loadingText="送信中"
          size="lg"
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          type="submit"
          isLoading={isLoading}
        >
          再発行
        </Button>
      </Stack>
    </>
  );
};
