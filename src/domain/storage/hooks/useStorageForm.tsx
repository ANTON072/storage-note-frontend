import { useDisclosure } from "@chakra-ui/react";

import { StorageFormContainer } from "../containers/StorageFormContainer";

export const useStorageForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const StorageFormDrawer: React.FC = () => {
    return <StorageFormContainer isOpen={isOpen} onClose={onClose} />;
  };

  return {
    onOpen,
    StorageFormDrawer,
  };
};
