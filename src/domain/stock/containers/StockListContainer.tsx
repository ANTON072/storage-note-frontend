import { Stack } from "@chakra-ui/react";

import { useCategory } from "@/domain/category";
import type { StorageResponse } from "@/domain/storage";

import { NoResult, StockListItem, useStockListQuery } from "..";

import { CounterContainer } from "./CoutnerContainer";
import { FavoriteContainer } from "./FavoriteContainer";

type Props = {
  storage: StorageResponse;
};

export const StockListContainer = ({ storage }: Props) => {
  const { stockListQuery } = useStockListQuery(storage.id);

  const { findCategory } = useCategory(storage.id);

  const result = stockListQuery.data || [];

  if (stockListQuery.isFetched && result.length < 1) {
    return <NoResult />;
  }

  return (
    <Stack spacing={3}>
      {result.map((stock) => (
        <StockListItem
          key={stock.id}
          storage={storage}
          stock={stock}
          category={findCategory(stock.categoryId)}
          favoriteComponent={
            <FavoriteContainer storageId={storage.id} stock={stock} />
          }
          counterComponent={
            <CounterContainer storageId={storage.id} stock={stock} />
          }
        />
      ))}
    </Stack>
  );
};
