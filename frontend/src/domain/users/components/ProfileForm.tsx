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
} from "@chakra-ui/react";

export const ProfileForm = () => {
  return (
    <VStack spacing={`10`}>
      <Stack>
        <Avatar size="2xl" />
        <Button colorScheme="blue">アップロード</Button>
      </Stack>
      <Box width={`100%`}>
        <FormControl>
          <FormLabel>ユーザー名</FormLabel>
          <Input type="text" />
          <FormHelperText textAlign={`left`}>
            5文字以上15文字以内で設定してください
          </FormHelperText>
        </FormControl>
      </Box>
      <Box width={`100%`}>
        <FormControl>
          <FormLabel>通知用メールアドレス</FormLabel>
          <Input type="email" />
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
