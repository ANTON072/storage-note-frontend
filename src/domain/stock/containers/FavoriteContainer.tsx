import { useCallback, useState } from "react";

import { useMutation } from "react-query";
import { useDebounce } from "react-use";

import { appApi, API_BASE_URL } from "@/domain/application";

import { FavoriteButton } from "../components/StockListItem/FavoriteButton";

import type { StockResponse } from "../types";

type Props = {
  stock: StockResponse;
  storageId: string;
};

export const FavoriteContainer = ({ stock, storageId }: Props) => {
  const [localIsFavorite, setLocalFavorite] = useState(stock.isFavorite);

  const mutation = useMutation({
    mutationFn: async (isFavorite: boolean) => {
      return appApi.patch(
        `${API_BASE_URL}/v1/storages/${storageId}/stocks/${stock.id}/favorite`,
        {
          isFavorite,
        }
      );
    },
  });

  useDebounce(
    () => {
      mutation.mutate(localIsFavorite);
    },
    500,
    [localIsFavorite]
  );

  const handleToggle = useCallback(() => {
    setLocalFavorite((isFavorite) => !isFavorite);
  }, []);

  return (
    <FavoriteButton isFavorite={localIsFavorite} onToggle={handleToggle} />
  );
};
