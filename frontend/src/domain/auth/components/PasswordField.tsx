import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, UseFormReturn, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  fieldName: Path<T>;
};

export const PasswordField = <T extends FieldValues>({
  form: {
    control,
    formState: { errors },
  },
  fieldName,
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl id="password" isRequired isInvalid={!!errors.password}>
      <FormLabel>パスワード</FormLabel>
      <InputGroup>
        <Controller
          name={fieldName}
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
        <FormErrorMessage>{errors.password.message as string}</FormErrorMessage>
      )}
    </FormControl>
  );
};
