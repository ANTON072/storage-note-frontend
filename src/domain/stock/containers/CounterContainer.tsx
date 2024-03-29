import { useCallback, useState } from "react";

import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useDebounce } from "react-use";

import { API_BASE_URL, appApi } from "@/domain/application";

import { Counter } from "../components/StockListItem/Counter";

import type { StockResponse } from "../types";

type Props = {
  stock: StockResponse;
  storageId: string;
  setFetching: (isFetching: boolean) => void;
  refetchStockList: () => void;
};

export const CounterContainer = ({
  stock,
  storageId,
  setFetching,
  refetchStockList,
}: Props) => {
  const [localItemCount, setLocalItemCount] = useState(stock.itemCount);

  const [isMounted, setMounted] = useState(false);

  const toast = useToast();

  const mutation = useMutation({
    mutationFn: async (itemCount: number) => {
      return appApi.patch(
        `${API_BASE_URL}/v1/storages/${storageId}/stocks/${stock.id}/item_count`,
        {
          itemCount,
        }
      );
    },
    onSuccess: () => {
      refetchStockList();
    },
    onError: () => {
      setLocalItemCount(stock.itemCount);
      toast({
        title: "在庫の更新に失敗しました",
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
      mutation.mutate(localItemCount);
    },
    500,
    [localItemCount]
  );

  const displayCount = `${localItemCount}${stock.unitName}`;

  const handleCountChange = useCallback((upOrDown: "up" | "down") => {
    setFetching(true);
    setLocalItemCount((count) => {
      if (upOrDown === "up") {
        return count + 1;
      }
      return Math.max(count - 1, 0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Counter displayCount={displayCount} onCountChange={handleCountChange} />
  );
};
