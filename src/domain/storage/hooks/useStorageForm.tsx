import { AddIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";

import { StorageFormContainer } from "../containers/StorageFormContainer";

export const useStorageForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const StorageFormDrawer: React.FC = () => {
    return <StorageFormContainer isOpen={isOpen} onClose={onClose} />;
  };

  const CreateStorageButton: React.FC = () => {
    return (
      <Button
        leftIcon={<AddIcon />}
        colorScheme="blue"
        onClick={() => onOpen()}
      >
        新規ストレージ作成
      </Button>
    );
  };

  return {
    onOpen,
    StorageFormDrawer,
    CreateStorageButton,
  };
};
