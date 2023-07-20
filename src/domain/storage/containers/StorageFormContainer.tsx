import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { omit } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { appApi, useFirebaseStorage, API_BASE_URL } from "@/domain/application";
import { useUser } from "@/domain/users";

import { StorageForm } from "../components/StorageForm";
import { storageSchema } from "../types";

import type { Storage, StorageRequest } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const StorageFormContainer = ({ isOpen, onClose }: Props) => {
  const form = useForm<Storage>({
    defaultValues: {
      name: "",
      members: [],
      imageUrl: "",
    },
    resolver: yupResolver(storageSchema),
  });

  const queryClient = useQueryClient();

  const { appUser } = useUser();

  const toast = useToast();

  const { uploadImage } = useFirebaseStorage();

  const mutation = useMutation({
    mutationFn: async (values: Storage) => {
      const imageUrl = await uploadImage({
        url: values.imageUrl || "",
        namePrefix: "storage_",
      });
      const memberIds = values.members?.map((member) => member.name) || [];
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
        title: "ストレージを作成しました",
      });
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "ストレージの作成に失敗しました",
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
    />
  );
};
