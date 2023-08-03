import type { ElementRef } from "react";
import { useEffect, useRef, useMemo } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Select,
  HStack,
  FormHelperText,
  Button,
  Divider,
  Box,
} from "@chakra-ui/react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { useFileUpload } from "@/domain/application";
import type { CategoryResponse } from "@/domain/category/types";

import type { StockFormValues } from "../../types";

type Props = {
  form: UseFormReturn<StockFormValues>;
  onSubmit: (values: StockFormValues) => void;
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryResponse[];
  isLoading: boolean;
  isEdit: boolean;
  onDeleteStock?: () => void;
};

type TextValues = {
  title: string;
  submitButton: string;
};

export const StockForm = ({
  form,
  onSubmit,
  isOpen,
  onClose,
  categories,
  isLoading,
  isEdit,
  onDeleteStock,
}: Props) => {
  const firstField = useRef<ElementRef<"input">>(null);

  const { FileUpload, imageValue, setImageValue } = useFileUpload();

  const defaultImageValue = form.getValues("imageUrl");

  const textValues: TextValues = useMemo(() => {
    return {
      title: isEdit ? "ストック編集" : "ストック新規作成",
      submitButton: isEdit ? "編集完了" : "新規作成",
    };
  }, [isEdit]);

  useEffect(() => {
    form.setValue("imageUrl", imageValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageValue]);

  useEffect(() => {
    if (defaultImageValue) {
      setImageValue(defaultImageValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Drawer
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        isOpen={isOpen}
        size={`md`}
      >
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {textValues.title}
          </DrawerHeader>
          <DrawerBody>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Stack py={2} spacing={2}>
                <FormControl isRequired>
                  <FormLabel>商品名</FormLabel>
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <Input {...field} autoComplete="off" ref={firstField} />
                    )}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>写真</FormLabel>
                  <Box maxW={300} mx={`auto`}>
                    <FileUpload />
                  </Box>
                </FormControl>
                <FormControl>
                  <FormLabel>カテゴリー</FormLabel>
                  <Controller
                    name="categoryId"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field}>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>購入場所</FormLabel>
                  <Controller
                    name="purchaseLocation"
                    control={form.control}
                    render={({ field }) => (
                      <Input {...field} placeholder="店舗名かURLを入力" />
                    )}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>購入金額</FormLabel>
                  <Controller
                    name="price"
                    control={form.control}
                    render={({ field }) => (
                      <Input {...field} placeholder="1,000円" />
                    )}
                  />
                </FormControl>
                <HStack>
                  <FormControl isRequired>
                    <FormLabel>初期在庫数</FormLabel>
                    <Controller
                      name="itemCount"
                      control={form.control}
                      render={({ field }) => <Input {...field} type="number" />}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>単位</FormLabel>
                    <Controller
                      name="unitName"
                      control={form.control}
                      render={({ field }) => <Input {...field} />}
                    />
                  </FormControl>
                </HStack>
                <FormControl isRequired>
                  <FormLabel>在庫減少アラート通知個数</FormLabel>
                  <Controller
                    name="alertThreshold"
                    control={form.control}
                    render={({ field }) => <Input {...field} type="number" />}
                  />
                  <FormHelperText>
                    この個数以下になるとアラート表示になります
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>メモ</FormLabel>
                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <Textarea {...field} resize={`vertical`} />
                    )}
                  />
                </FormControl>
              </Stack>
              <Divider my={3} />
              <Button
                w={`100%`}
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}
              >
                {textValues.submitButton}
              </Button>
              {onDeleteStock && (
                <Box mt={10} textAlign={`right`}>
                  <Button
                    onClick={onDeleteStock}
                    variant={`ghost`}
                    size={`sm`}
                    color={`gray.500`}
                  >
                    ストックを削除する
                  </Button>
                </Box>
              )}
            </form>
          </DrawerBody>
        </DrawerContent>
        <DrawerOverlay />
      </Drawer>
    </>
  );
};
