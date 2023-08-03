import { Stack } from "@chakra-ui/react";

import type { StorageResponse } from "@/domain/storage";

import { NoResult, StockListItemContainer, useStockListQuery } from "..";

import type { StockResponse } from "../types";

type Props = {
  storage: StorageResponse;
  onOpenForm: (values: StockResponse) => void;
};

export const StockListContainer = ({ storage, onOpenForm }: Props) => {
  const { stockListQuery } = useStockListQuery(storage.id);

  const result = stockListQuery.data || [];

  if (stockListQuery.isFetched && result.length < 1) {
    return <NoResult />;
  }

  return (
    <Stack spacing={3}>
      {result.map((stock) => (
        <StockListItemContainer
          key={stock.id}
          storage={storage}
          stock={stock}
          onOpenForm={onOpenForm}
        />
      ))}
    </Stack>
  );
};
