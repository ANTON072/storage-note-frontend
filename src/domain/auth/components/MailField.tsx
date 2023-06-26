import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

import type { UseFormReturn, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  fieldName: Path<T>;
};

export const MailField = <T extends FieldValues = FieldValues>({
  form: {
    control,
    formState: { errors },
  },
  fieldName,
}: Props<T>) => {
  return (
    <FormControl id="email" isRequired isInvalid={!!errors[fieldName]}>
      <FormLabel>メールアドレス</FormLabel>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => <Input type="email" {...field} />}
      />
    </FormControl>
  );
};
