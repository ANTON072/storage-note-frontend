import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Controller, UseFormReturn } from "react-hook-form";

import { PasswordLoginValues } from "../types";

type Props = {
  form: UseFormReturn<PasswordLoginValues>;
  onSubmit: (data: PasswordLoginValues) => void;
  isLoading: boolean;
  flashComponent?: React.ReactNode;
  reSendMailComponent?: React.ReactNode;
};

export const RegisterForm = ({
  onSubmit,
  isLoading,
  flashComponent,
  reSendMailComponent,
  form,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {flashComponent}
          {reSendMailComponent}
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
                  <Input type={showPassword ? "text" : "password"} {...field} />
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
    </>
  );
};
