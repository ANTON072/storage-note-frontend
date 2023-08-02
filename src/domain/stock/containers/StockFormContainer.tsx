import { useCallback } from "react";

import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { API_BASE_URL, appApi } from "@/domain/application";
import { useCategoriesQuery } from "@/domain/category";

import { StockForm } from "../components/StockForm";
import { stockSchema, type StockFormValues } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  storageId: string;
};

export const StockFormContainer = ({ isOpen, onClose, storageId }: Props) => {
  const { categoriesQuery } = useCategoriesQuery(storageId);

  const toast = useToast();

  const queryClient = useQueryClient();

  const categories = categoriesQuery.data || [];

  const defaultCategory = categories.find(
    (category) => category.name === "未分類"
  );

  const refetchStock = useCallback(() => {
    return queryClient.refetchQueries(["stock", storageId]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mutate = useMutation({
    mutationFn: async (stock: StockFormValues) => {
      return appApi.post(`${API_BASE_URL}/v1/storages/${storageId}/stocks`, {
        stock,
      });
    },
    onSuccess: async () => {
      await refetchStock();
      onClose();
      toast({
        title: "ストックを追加しました",
      });
    },
    onError: () => {
      toast({
        title: "ストックの追加に失敗しました",
        status: "error",
      });
    },
  });

  const form = useForm<StockFormValues>({
    defaultValues: {
      name: "",
      description: "",
      purchaseLocation: "",
      imageUrl: "",
      price: "",
      itemCount: 0,
      unitName: "個",
      alertThreshold: 1,
      categoryId: defaultCategory?.id,
    },
    resolver: yupResolver(stockSchema),
  });

  return (
    <>
      <StockForm
        form={form}
        isOpen={isOpen}
        onClose={onClose}
        categories={categories}
        onSubmit={(values: StockFormValues) => {
          mutate.mutate(values);
        }}
        isLoading={mutate.isLoading}
      />
    </>
  );
};
