import { useCallback, useMemo } from "react";

import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

import { useCategoriesQuery } from "@/domain/category";

import { StockForm } from "../components/StockForm";
import { useCreateAndUpdateStockMutation } from "../hooks/useCreateAndUpdateStockMutation";
import { stockSchema, type StockFormValues } from "../types";

type Props = {
  isEdit?: boolean;
  isOpen: boolean;
  onClose: () => void;
  storageId: string;
};

type TextValues = {
  successMessage: string;
  errorMessage: string;
};

export const StockFormContainer = ({
  isEdit = false,
  isOpen,
  onClose,
  storageId,
}: Props) => {
  const { categoriesQuery } = useCategoriesQuery(storageId);

  const toast = useToast();

  const queryClient = useQueryClient();

  const categories = categoriesQuery.data || [];

  const textValues: TextValues = useMemo(() => {
    return {
      successMessage: isEdit
        ? "ストックを編集しました"
        : "ストックを作成しました",
      errorMessage: isEdit
        ? "ストックの編集に失敗しました"
        : "ストックの作成に失敗しました",
    };
  }, [isEdit]);

  const defaultCategory = categories.find(
    (category) => category.name === "未分類"
  );

  const refetchStock = useCallback(() => {
    return queryClient.refetchQueries(["stock", storageId]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutation } = useCreateAndUpdateStockMutation({
    isEdit,
    storageId,
    onSuccess: async () => {
      await refetchStock();
      onClose();
      toast({
        title: textValues.successMessage,
      });
    },
    onError: () => {
      toast({
        title: textValues.errorMessage,
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
          mutation.mutate(values);
        }}
        isLoading={mutation.isLoading}
      />
    </>
  );
};
