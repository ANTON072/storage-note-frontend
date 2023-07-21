import { useEffect, useMemo, useRef } from "react";

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
  Textarea,
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
  isLoading: boolean;
  isEdit: boolean;
};

type TextValues = {
  title: string;
  submitButton: string;
};

export const StorageForm = ({
  isOpen,
  onClose,
  form,
  onSubmit,
  isLoading,
  isEdit,
}: Props) => {
  const firstField = useRef<HTMLInputElement>(null);

  const {
    SuggestUsers,
    selectList: selectMemberList,
    setSelectList,
  } = useSuggestUsers();

  const { FileUpload, imageValue, setImageValue } = useFileUpload();

  const textValues: TextValues = useMemo(() => {
    return {
      title: isEdit ? "ストレージ編集" : "ストレージ新規作成",
      submitButton: isEdit ? "編集完了" : "新規作成",
    };
  }, [isEdit]);

  const errors = form.formState.errors;

  const defaultImageValue = form.getValues("imageUrl");
  const defaultMembersValue = form.getValues("members");

  useEffect(() => {
    form.setValue("members", selectMemberList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMemberList]);

  useEffect(() => {
    form.setValue("imageUrl", imageValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageValue]);

  useEffect(() => {
    if (defaultImageValue) {
      setImageValue(defaultImageValue);
    }
    if (defaultMembersValue) {
      setSelectList(defaultMembersValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">{textValues.title}</DrawerHeader>
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
                      autoComplete="off"
                      placeholder="〇〇のストレージ"
                      ref={firstField}
                    />
                  )}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors["description"]}>
                <FormLabel>ストレージの説明</FormLabel>
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <Textarea resize={`vertical`} {...field} />
                  )}
                />
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
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
              <Button
                w={`100%`}
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}
              >
                {textValues.submitButton}
              </Button>
            </Box>
          </form>
        </DrawerBody>
      </DrawerContent>
      <DrawerOverlay />
    </Drawer>
  );
};
