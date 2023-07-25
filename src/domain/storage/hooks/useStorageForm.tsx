import { useCallback, useState } from "react";

import { AddIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";

import { StorageFormContainer } from "../containers/StorageFormContainer";

import type { StorageResponse } from "../types";

export const useStorageForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [defaultValues, setDefaultValues] = useState<StorageResponse>();

  const StorageFormDrawer: React.FC = () => {
    return (
      <StorageFormContainer
        isOpen={isOpen}
        onClose={onClose}
        defaultValues={defaultValues}
      />
    );
  };

  const CreateStorageButton: React.FC = () => {
    return (
      <Button
        leftIcon={<AddIcon />}
        colorScheme="blue"
        onClick={() => onOpen()}
        size={`sm`}
      >
        新規ストレージ作成
      </Button>
    );
  };

  const onDrawerOpen = useCallback((values?: StorageResponse) => {
    if (values) {
      setDefaultValues(values);
    }
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    onDrawerOpen,
    StorageFormDrawer,
    CreateStorageButton,
  };
};
