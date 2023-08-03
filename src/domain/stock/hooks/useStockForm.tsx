import { useCallback, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";

import { StockFormContainer } from "../containers/StockFormContainer";

import type { StockResponse } from "../types";

export const useStockForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [defaultValues, setDefaultValues] = useState<StockResponse>();

  const StockFormDrawer = ({ storageId }: { storageId: string }) => {
    return (
      <StockFormContainer
        isOpen={isOpen}
        onClose={onClose}
        storageId={storageId}
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
