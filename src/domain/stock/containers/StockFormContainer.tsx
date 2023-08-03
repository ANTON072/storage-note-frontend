import { useCallback, useMemo } from "react";

import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { API_BASE_URL, appApi, useConfirm } from "@/domain/application";
import { useCategoriesQuery } from "@/domain/category";
import type { StorageResponse } from "@/domain/storage";
import { useUser } from "@/domain/users";

import { StockForm } from "../components/StockForm";
import { useCreateAndUpdateStockMutation } from "../hooks/useCreateAndUpdateStockMutation";
import { stockSchema } from "../types";

import type { StockResponse, StockFormValues } from "../types";

type Props = {
  isEdit?: boolean;
  isOpen: boolean;
  onClose: () => void;
  storage: StorageResponse;
  defaultValues?: StockResponse;
};

type TextValues = {
  successMessage: string;
  errorMessage: string;
};

export const StockFormContainer = ({
  isOpen,
  onClose,
  storage,
  defaultValues,
}: Props) => {
  const { categoriesQuery } = useCategoriesQuery(storage.id);

  const toast = useToast();

  const queryClient = useQueryClient();

  const categories = categoriesQuery.data || [];

  const isEdit = !!defaultValues;

  const { appUser, isOwner } = useUser();

  const { confirm, ConfirmDialog } = useConfirm();

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

  const isStorageOwnerOrStorageCreator = useMemo(() => {
    if (!defaultValues || !defaultValues.name || !appUser) return false;
    const creator = defaultValues.createdBy;
    if (creator.name === appUser.name) return true;
    return isOwner(storage.members);
  }, [defaultValues, appUser, isOwner, storage.members]);

  const refetchStock = useCallback(() => {
    return queryClient.refetchQueries(["stock", storage.id]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutation: createAndUpdateMutation } = useCreateAndUpdateStockMutation(
    {
      isEdit,
      stockId: defaultValues?.id,
      storageId: storage.id,
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
    }
  );

  const deleteMutation = useMutation({
    mutationFn: () => {
      return appApi.delete(
        `${API_BASE_URL}/v1/storages/${storage.id}/stocks/${defaultValues?.id}`
      );
    },
    onSuccess: async () => {
      await refetchStock();
      onClose();
      toast({
        title: "ストックを削除しました",
      });
    },
    onError: () => {
      toast({
        title: "ストックの削除に失敗しました",
        status: "error",
      });
    },
  });

  const {
    name = "",
    description = "",
    purchaseLocation = "",
    imageUrl = "",
    price = "",
    itemCount = 0,
    unitName = "個",
    alertThreshold = 1,
    categoryId = defaultCategory?.id,
  } = defaultValues || {};

  const form = useForm<StockFormValues>({
    defaultValues: {
      name,
      description,
      purchaseLocation,
      imageUrl,
      price,
      itemCount,
      unitName,
      alertThreshold,
      categoryId,
    },
    resolver: yupResolver(stockSchema),
  });

  const handleDeleteStock = useCallback(async () => {
    await confirm({
      title: "ストックの削除",
      body: "本当に削除しますか？ストックを削除すると復元できません。",
      confirmColor: "red",
    });
    deleteMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StockForm
        form={form}
        isOpen={isOpen}
        isEdit={isEdit}
        onClose={onClose}
        categories={categories}
        onSubmit={(values: StockFormValues) => {
          createAndUpdateMutation.mutate(values);
        }}
        isLoading={
          createAndUpdateMutation.isLoading || deleteMutation.isLoading
        }
        onDeleteStock={
          isStorageOwnerOrStorageCreator ? handleDeleteStock : undefined
        }
      />
      <ConfirmDialog />
    </>
  );
};
