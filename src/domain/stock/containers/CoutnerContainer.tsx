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
};

export const CounterContainer = ({ stock, storageId }: Props) => {
  const [localItemCount, setLocalItemCount] = useState(stock.itemCount);

  const toast = useToast();

  const mutation = useMutation({
    mutationFn: async (count: number) => {
      return appApi.patch(
        `${API_BASE_URL}/v1/storages/${storageId}/stocks/${stock.id}/item_count`,
        {
          itemCount: count,
        }
      );
    },
    onError: () => {
      setLocalItemCount(stock.itemCount);
      toast({
        title: "在庫の更新に失敗しました",
        status: "error",
      });
    },
  });

  useDebounce(
    () => {
      // XXX: 1upして通信、1downした場合
      if (stock.itemCount !== localItemCount) {
        mutation.mutate(localItemCount);
      }
    },
    500,
    [localItemCount]
  );

  const displayCount = `${localItemCount}${stock.unitName}`;

  const handleCountChange = useCallback((upOrDown: "up" | "down") => {
    setLocalItemCount((count) => {
      if (upOrDown === "up") {
        return count + 1;
      }
      return Math.max(count - 1, 0);
    });
  }, []);

  return (
    <Counter displayCount={displayCount} onCountChange={handleCountChange} />
  );
};
