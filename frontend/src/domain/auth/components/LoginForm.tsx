import { useState } from "react";
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
import { Controller, UseFormReturn } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

import { PasswordLoginValues } from "../types";

type Props = {
  form: UseFormReturn<PasswordLoginValues>;
  onSubmit: (data: PasswordLoginValues) => void;
  isLoading: boolean;
  flashComponent?: React.ReactNode;
  reSendMailComponent?: React.ReactNode;
};

export const LoginForm = ({
  form,
  onSubmit,
  isLoading,
  flashComponent,
  reSendMailComponent,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        {flashComponent}
        {reSendMailComponent}
        <FormControl id="email" isRequired isInvalid={false}>
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
                onClick={() => setShowPassword((showPassword) => !showPassword)}
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
            ログイン
          </Button>
        </Stack>
        <Stack pt={6}>
          <Text fontSize="xs">
            <Link as={RouterLink} to="/auth/register" color={"blue.400"}>
              新規会員登録はこちら
            </Link>
          </Text>
          <Text fontSize="xs">
            <Link
              as={RouterLink}
              to="/auth/password-reminder"
              color={"blue.400"}
            >
              パスワードをお忘れの方
            </Link>
          </Text>
        </Stack>
      </Stack>
    </form>
  );
};
