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
} from "@chakra-ui/react";

import { AutoComplete } from "@/domain/application";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const StorageForm = ({ isOpen, onClose }: Props) => {
  const firstField = useRef<HTMLInputElement>(null);

  return (
    <Drawer
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
      isOpen={true}
    >
      <DrawerOverlay />
      <DrawerCloseButton />
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
              <FormLabel htmlFor="storageName">メンバー</FormLabel>
              <AutoComplete placeholder="メンバーIDを入力してください" />
            </Box>
            <Box>
              <Button>新規作成</Button>
            </Box>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
