import { useCallback } from "react";

import { FavoriteButton } from "../components/StockListItem/FavoriteButton";

import type { StockResponse } from "../types";

type Props = {
  stock: StockResponse;
};

export const FavoriteContainer = ({ stock }: Props) => {
  const handleToggle = useCallback(() => {
    //
  }, []);

  return (
    <FavoriteButton isFavorite={stock.isFavorite} onToggle={handleToggle} />
  );
};
