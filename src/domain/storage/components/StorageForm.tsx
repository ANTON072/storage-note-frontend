import { useRef } from "react";

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
} from "@chakra-ui/react";

import { FileUpload } from "@/domain/application";
import { useSuggestUsers } from "@/domain/users";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const StorageForm = ({ isOpen, onClose }: Props) => {
  const firstField = useRef<HTMLInputElement>(null);

  const { SuggestUsers } = useSuggestUsers();

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
          <Stack py={3} spacing={5}>
            <Box>
              <FormLabel htmlFor="storageName">ストレージ名</FormLabel>
              <Input
                ref={firstField}
                id="storageName"
                placeholder="〇〇のストレージ"
              />
            </Box>
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
            <Button w={`100%`} colorScheme="blue">
              新規作成
            </Button>
          </Box>
        </DrawerBody>
      </DrawerContent>
      <DrawerOverlay />
    </Drawer>
  );
};
