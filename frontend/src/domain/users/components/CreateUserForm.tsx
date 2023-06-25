import {
  Box,
  VStack,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";

import { UserAvatar } from "./UserAvatar";

import type { AppUser } from "../types";
import type { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<AppUser>;
  isLoading: boolean;
};

export const CreateUserForm = ({ form, isLoading }: Props) => {
  const errors = form.formState.errors;

  return (
    <VStack spacing={`10`}>
      <Stack>
        <UserAvatar form={form} />
      </Stack>
      <Box width={`100%`}>
        <FormControl isInvalid={!!errors.userId} isRequired>
          <FormLabel>ユーザーID</FormLabel>
          <FormHelperText textAlign={`left`} mb={2}>
            ユーザーIDは英数とアンダースコアのみ、3文字以上15文字以内で、必ず1つ以上の英字が含まれている必要があります。
          </FormHelperText>
          <Input required type="text" {...form.register("userId")} />
          {errors.userId && (
            <FormErrorMessage textAlign={`left`}>
              {errors.userId.message}
            </FormErrorMessage>
          )}
        </FormControl>
      </Box>
      <Box width={`100%`}>
        <Button
          type="submit"
          colorScheme="blue"
          size={`lg`}
          width={`100%`}
          isLoading={isLoading}
        >
          保存する
        </Button>
      </Box>
    </VStack>
  );
};
