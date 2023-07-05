import {
  Box,
  VStack,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";

import { UserAvatar } from "./UserAvatar";

import type { AppUser } from "../types";
import type { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<AppUser>;
  isLoading: boolean;
};

export const UserSettingsForm = ({ form, isLoading }: Props) => {
  const name = form.getValues("name");

  console.log("name", name);

  return (
    <VStack spacing={5}>
      <Stack>
        <UserAvatar form={form} />
      </Stack>
      <Stack>
        <Text fontSize={20}>{name}</Text>
        <Text fontSize={14} color="gray.500">
          ユーザーIDは変更できません
        </Text>
      </Stack>
      <Stack>
        <Button colorScheme="blue" type="submit" isLoading={isLoading}>
          プロフィール情報を更新
        </Button>
      </Stack>
    </VStack>
  );
};
