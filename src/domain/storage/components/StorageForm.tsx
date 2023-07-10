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
} from "@chakra-ui/react";

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
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerCloseButton />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">ストレージ新規作成</DrawerHeader>
        <DrawerBody>
          <Stack>
            <Box>
              <FormLabel htmlFor="storageName">ストレージ名</FormLabel>
              <Input
                ref={firstField}
                id="storageName"
                placeholder="〇〇のストレージ"
              />
            </Box>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
