import { useEffect, useRef } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Stack,
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { useFileUpload } from "@/domain/application";
import { useSuggestUsers } from "@/domain/users";

import type { Storage } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  form: UseFormReturn<Storage>;
  onSubmit: (values: Storage) => void;
};

export const StorageForm = ({ isOpen, onClose, form, onSubmit }: Props) => {
  const firstField = useRef<HTMLInputElement>(null);

  const { SuggestUsers, selectList: selectMemberList } = useSuggestUsers();

  const { FileUpload, imageValue } = useFileUpload();

  const errors = form.formState.errors;

  useEffect(() => {
    form.setValue("members", selectMemberList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMemberList]);

  useEffect(() => {
    form.setValue("imageUrl", imageValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageValue]);

  return (
    <Drawer
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">ストレージ新規作成</DrawerHeader>
        <DrawerBody>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack py={3} spacing={5}>
              <FormControl isRequired isInvalid={!!errors["name"]}>
                <FormLabel>ストレージ名</FormLabel>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="〇〇のストレージ"
                      ref={firstField}
                    />
                  )}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <Box>
                <FormLabel htmlFor="storageName">メンバーの追加</FormLabel>
                <SuggestUsers />
              </Box>
              <Box>
                <FormLabel htmlFor="storageName">サムネイル</FormLabel>
                <FileUpload />
              </Box>
            </Stack>
            <Divider my={3} />
            <Box>
              <Button w={`100%`} colorScheme="blue" type="submit">
                新規作成
              </Button>
            </Box>
          </form>
        </DrawerBody>
      </DrawerContent>
      <DrawerOverlay />
    </Drawer>
  );
};
