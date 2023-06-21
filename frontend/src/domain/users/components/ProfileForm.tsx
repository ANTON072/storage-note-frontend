import {
  Avatar,
  Box,
  VStack,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
  InputGroup,
} from "@chakra-ui/react";

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
        <Avatar src={values.photoURL} size="2xl" />
        <InputGroup
          onClick={() => {
            console.log("click");
          }}
        >
          {values.photoURL ? (
            <Button colorScheme="red">画像を削除</Button>
          ) : (
            <Button colorScheme="blue">画像を選択</Button>
          )}
        </InputGroup>
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
      <Box>
        <Button variant={`ghost`}>退会する</Button>
      </Box>
    </VStack>
  );
};
