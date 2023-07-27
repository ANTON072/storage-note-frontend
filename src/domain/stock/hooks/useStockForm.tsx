import { useCallback, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";

import { useCategoriesQuery } from "@/domain/category";

import { StockFormContainer } from "../containers/StockFormContainer";

import type { StockResponse } from "../types";

export const useStockForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [defaultValues, setDefaultValues] = useState<StockResponse>();

  // const {} = useCategoriesQuery();

  const StockFormDrawer = ({ storageId }: { storageId: string }) => {
    return (
      <StockFormContainer
        isOpen={isOpen}
        onClose={onClose}
        storageId={storageId}
      />
    );
  };

  const onDrawerOpen = useCallback(() => {
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { onDrawerOpen, StockFormDrawer };
};
