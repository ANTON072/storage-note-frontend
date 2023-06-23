import {
  Box,
  VStack,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
} from "@chakra-ui/react";

import { UserAvatar } from "./UserAvatar";

import type { AppUser } from "../types";
import type { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<AppUser>;
};

export const ProfileForm = ({ form }: Props) => {
  const values = form.getValues();

  return (
    <VStack spacing={`10`}>
      <Stack>
        <UserAvatar photoURL={values.photoURL} />
      </Stack>
      <Box width={`100%`}>
        <FormControl>
          <FormLabel>ユーザーID</FormLabel>
          <Input type="text" {...form.register("userId")} />
          <FormHelperText textAlign={`left`}>
            5文字以上15文字以内で設定してください
          </FormHelperText>
        </FormControl>
      </Box>
      <Box width={`100%`}>
        <FormControl>
          <FormLabel>通知用メールアドレス</FormLabel>
          <Input type="email" {...form.register("notificationEmail")} />
        </FormControl>
      </Box>
      <Box width={`100%`}>
        <Button colorScheme="blue" size={`lg`} width={`100%`}>
          保存する
        </Button>
      </Box>
      {/* 正規ユーザーのみ退会できる */}
      {values.userId && (
        <Box>
          <Button variant={`ghost`}>退会する</Button>
        </Box>
      )}
    </VStack>
  );
};
