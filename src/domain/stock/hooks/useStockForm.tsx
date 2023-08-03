import { useCallback, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";

import type { StorageResponse } from "@/domain/storage";

import { StockFormContainer } from "../containers/StockFormContainer";

import type { StockResponse } from "../types";

export const useStockForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [defaultValues, setDefaultValues] = useState<StockResponse>();

  const StockFormDrawer = ({ storage }: { storage: StorageResponse }) => {
    return (
      <StockFormContainer
        isOpen={isOpen}
        onClose={onClose}
        storage={storage}
        defaultValues={defaultValues}
      />
    );
  };

  const onDrawerOpen = useCallback((values?: StockResponse) => {
    if (values) {
      setDefaultValues(values);
    }
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { onDrawerOpen, StockFormDrawer };
};
