import {
  Box,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export const ChangeLoginForm = () => {
  return (
    <VStack spacing={10}>
      <Box width={`100%`}>
        <FormControl>
          <FormLabel>メールアドレス</FormLabel>
          <Input type="email" />
        </FormControl>
        <Box mt={3}>
          <Button colorScheme="blue">メールアドレスを変更する</Button>
        </Box>
      </Box>
      <Box width={`100%`}>
        <FormControl>
          <FormLabel>パスワード</FormLabel>
          <Input type="password" />
        </FormControl>
        <Box mt={3}>
          <Button colorScheme="blue">パスワードを変更する</Button>
        </Box>
      </Box>
    </VStack>
  );
};
