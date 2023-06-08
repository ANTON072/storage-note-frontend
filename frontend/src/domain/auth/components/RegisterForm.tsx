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
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { PasswordLoginValues, passwordLoginSchema } from "../types";

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordLoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(passwordLoginSchema),
  });

  const onSubmit = (data: any) => console.log(data);

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired isInvalid={!!errors.email}>
              <FormLabel>メールアドレス</FormLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input type="email" {...field} />}
              />
            </FormControl>
            <FormControl id="password" isRequired isInvalid={!!errors.password}>
              <FormLabel>パスワード</FormLabel>
              <InputGroup>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  )}
                />
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
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
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
                type="submit"
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
        </form>
      </Box>
    </Stack>
  );
};
