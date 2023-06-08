import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack
      spacing={8}
      mx={"auto"}
      minW={useBreakpointValue({ base: "auto", md: "lg" })}
      maxW={"lg"}
      py={12}
      px={6}
    >
      <Stack align={"center"}>
        <Heading fontSize={"3xl"} textAlign={"center"}>
          新規アカウント登録
        </Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>メールアドレス</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>パスワード</FormLabel>
            <InputGroup>
              <Input type={showPassword ? "text" : "password"} />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              アカウントを作成
            </Button>
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
      </Box>
    </Stack>
  );
};
