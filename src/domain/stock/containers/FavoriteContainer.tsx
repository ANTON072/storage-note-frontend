import { useCallback, useState } from "react";

import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useDebounce } from "react-use";

import { appApi, API_BASE_URL } from "@/domain/application";

import { FavoriteButton } from "../components/StockListItem/FavoriteButton";

import type { StockResponse } from "../types";

type Props = {
  stock: StockResponse;
  storageId: string;
  setFetching: (isFetching: boolean) => void;
  refetchStockList: () => void;
};

export const FavoriteContainer = ({
  stock,
  storageId,
  setFetching,
  refetchStockList,
}: Props) => {
  const [localIsFavorite, setLocalFavorite] = useState(stock.isFavorite);

  const [isMounted, setMounted] = useState(false);

  const toast = useToast();

  const mutation = useMutation({
    mutationFn: async (isFavorite: boolean) => {
      return appApi.patch(
        `${API_BASE_URL}/v1/storages/${storageId}/stocks/${stock.id}/favorite`,
        {
          isFavorite,
        }
      );
    },
    onSuccess: () => {
      refetchStockList();
    },
    onError: () => {
      setLocalFavorite(stock.isFavorite);
      toast({
        title: "お気に入りの登録に失敗しました",
        status: "error",
      });
    },
    onSettled: () => {
      setFetching(false);
    },
  });

  useDebounce(
    () => {
      if (!isMounted) {
        setMounted(true);
        return;
      }
      mutation.mutate(localIsFavorite);
    },
    500,
    [localIsFavorite]
  );

  const handleToggle = useCallback(() => {
    setFetching(true);
    setLocalFavorite((isFavorite) => !isFavorite);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FavoriteButton isFavorite={localIsFavorite} onToggle={handleToggle} />
  );
};
