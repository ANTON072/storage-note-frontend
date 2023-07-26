import { useCallback } from "react";

import { useDisclosure } from "@chakra-ui/react";

import { useCategoriesQuery } from "@/domain/category";

import { StockFormContainer } from "../containers/StockFormContainer";

type Args = {
  storageId: string;
};

export const useStockForm = ({ storageId }: Args) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const {} = useCategoriesQuery();

  const StockFormDrawer = () => {
    return <StockFormContainer isOpen={isOpen} onClose={onClose} />;
  };

  const onDrawerOpen = useCallback(() => {
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { onDrawerOpen, StockFormDrawer };
};
