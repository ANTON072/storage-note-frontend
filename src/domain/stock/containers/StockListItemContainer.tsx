import { useState } from "react";

import { useCategory } from "@/domain/category";
import type { StorageResponse } from "@/domain/storage";

import { StockListItem } from "..";
import { useStockQuery } from "../hooks/useStockQuery";

import { CounterContainer } from "./CounterContainer";
import { FavoriteContainer } from "./FavoriteContainer";

import type { StockResponse } from "../types";

type Props = {
  storage: StorageResponse;
  stock: StockResponse;
  onOpenForm: (values: StockResponse) => void;
};

export const StockListItemContainer = ({
  storage,
  stock,
  onOpenForm,
}: Props) => {
  const { findCategory } = useCategory(storage.id);

  const [isFetching, setFetching] = useState(false);

  const { query: stockQuery } = useStockQuery({
    storageId: storage.id,
    stockId: stock.id,
    isEnabled: false,
  });

  return (
    <StockListItem
      storage={storage}
      stock={stock}
      category={findCategory(stock.categoryId)}
      isFetching={isFetching || stockQuery.isFetching}
      favoriteComponent={
        <FavoriteContainer
          storageId={storage.id}
          stock={stock}
          setFetching={setFetching}
        />
      }
      counterComponent={
        <CounterContainer
          storageId={storage.id}
          stock={stock}
          setFetching={setFetching}
        />
      }
      onEdit={async () => {
        const { data } = await stockQuery.refetch();
        if (!data) return;
        onOpenForm(data);
      }}
    />
  );
};
