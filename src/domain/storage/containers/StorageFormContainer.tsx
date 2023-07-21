import { useMemo } from "react";

import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { omit } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { appApi, useFirebaseStorage, API_BASE_URL } from "@/domain/application";
import { useUser } from "@/domain/users";

import { StorageForm } from "../components/StorageForm";
import { storageSchema } from "../types";

import type { Storage, StorageRequest, StorageResponse } from "../types";

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

  const form = useForm<Storage>({
    defaultValues: {
      name,
      description,
      members: excludeOwnerMembers,
      imageUrl,
    },
    resolver: yupResolver(storageSchema),
  });

  const isEdit = !!defaultValues;

  const queryClient = useQueryClient();

  const { appUser } = useUser();

  const toast = useToast();

  const { uploadImage } = useFirebaseStorage();

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

  const mutation = useMutation({
    mutationFn: async (values: Storage) => {
      const imageUrl = await uploadImage({
        url: values.imageUrl || "",
        namePrefix: "storage_",
      });
      const memberIds = values.members?.map((member) => member.name) || [];

      if (isEdit) {
        return appApi.patch<StorageRequest>(
          `${API_BASE_URL}/v1/storages/${defaultValues.id}`,
          {
            storage: {
              ...omit(values, "members"),
              members: memberIds,
              imageUrl,
            },
          }
        );
      }

      return appApi.post<StorageRequest>(`${API_BASE_URL}/v1/storages`, {
        storage: {
          ...omit(values, "members"),
          members: memberIds,
          imageUrl,
        },
      });
    },
    onSuccess: () => {
      if (appUser) {
        queryClient.refetchQueries([`storages`, appUser.name]);
      }
      toast({
        title: textValues.successMessage,
      });
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: textValues.errorMessage,
        status: "error",
      });
    },
  });

  return (
    <StorageForm
      form={form}
      onSubmit={mutation.mutate}
      isOpen={isOpen}
      isLoading={mutation.isLoading}
      onClose={onClose}
      isEdit={isEdit}
    />
  );
};
