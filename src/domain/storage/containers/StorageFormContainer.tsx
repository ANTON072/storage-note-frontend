import { useCallback, useMemo } from "react";

import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

import { useConfirm } from "@/domain/application";
import { useUser } from "@/domain/users";

import { StorageForm } from "../components/StorageForm";
import { useCreateAndUpdateStorageMutation } from "../hooks/useCreateAndUpdateStorageMutation";
import { useDeleteStorageMutation } from "../hooks/useDeleteStorageMutation";
import { storageSchema } from "../types";

import type { StorageFormValues, StorageResponse } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: StorageResponse;
};

type TextValues = {
  successMessage: string;
  errorMessage: string;
};

export const StorageFormContainer = ({
  isOpen,
  defaultValues,
  onClose,
}: Props) => {
  const {
    name = "",
    description = "",
    members = [],
    imageUrl = "",
  } = defaultValues || {};

  const excludeOwnerMembers = members.filter((m) => !m.isOwner);

  const { appUser } = useUser();

  const queryClient = useQueryClient();

  const form = useForm<StorageFormValues>({
    defaultValues: {
      name,
      description,
      members: excludeOwnerMembers,
      imageUrl,
    },
    resolver: yupResolver(storageSchema),
  });

  const isEdit = !!defaultValues;

  const textValues: TextValues = useMemo(() => {
    return {
      successMessage: isEdit
        ? "ストレージを編集しました"
        : "ストレージを作成しました",
      errorMessage: isEdit
        ? "ストレージの編集に失敗しました"
        : "ストレージの作成に失敗しました",
    };
  }, [isEdit]);

  const refetchStorages = useCallback(() => {
    if (appUser) {
      return queryClient.refetchQueries([`storages`, appUser.name]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appUser]);

  const { mutation: createAndUpdateMutation } =
    useCreateAndUpdateStorageMutation({
      isEdit,
      storageId: defaultValues?.id,
      onSuccess: async () => {
        await refetchStorages();
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

  const { mutation: deleteMutation } = useDeleteStorageMutation({
    storageId: defaultValues?.id,
    onSuccess: async (values) => {
      onClose();
      await refetchStorages();
      toast({
        title: `ストレージ「${values.name}」を削除しました`,
      });
    },
    onError: () => {
      toast({
        title: `ストレージの削除に失敗しました`,
        status: "error",
      });
    },
  });

  const { confirm, ConfirmDialog } = useConfirm();

  const toast = useToast();

  const handleDeleteStorage = async () => {
    await confirm({
      title: "ストレージの削除",
      body: "本当に削除しますか？ストレージを削除すると復元できません。",
      confirmColor: "red",
    });
    deleteMutation.mutate();
  };

  return (
    <>
      <StorageForm
        form={form}
        onSubmit={createAndUpdateMutation.mutate}
        isOpen={isOpen}
        isLoading={createAndUpdateMutation.isLoading}
        onClose={onClose}
        isEdit={isEdit}
        onDeleteStorage={handleDeleteStorage}
      />
      <ConfirmDialog />
    </>
  );
};
