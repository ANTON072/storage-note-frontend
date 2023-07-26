import { useCallback } from "react";

import { useDisclosure } from "@chakra-ui/react";

import { StorageResponse } from "@/domain/storage/types";

import { StockFormContainer } from "../containers/StockFormContainer";

export const useStockForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const StockFormDrawer = () => {
    return <StockFormContainer isOpen={isOpen} onClose={onClose} />;
  };

  const onDrawerOpen = useCallback(() => {
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { onDrawerOpen, StockFormDrawer };
};
