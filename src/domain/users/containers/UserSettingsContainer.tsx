import { useCallback } from "react";

import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useUser } from "..";
import { useCreateUser } from "../api/useCreateUser";
import { UserSettingsForm } from "../components/UserSettingsForm";
import { appUserSchema, type AppUser } from "../types";

export const UserSettingsContainer = () => {
  const { user, refetch } = useUser();

  const { onUpdateUser, isLoading } = useCreateUser();

  const toast = useToast();

  const defaultValues: AppUser = {
    name: user?.name || "",
    photoUrl: user?.photoUrl || "",
  };

  const form = useForm<AppUser>({
    defaultValues,
    resolver: yupResolver(
      yup.object({
        photoUrl: appUserSchema.fields.photoUrl,
      })
    ),
  });

  const onSubmit = useCallback(
    async (values: AppUser) => {
      try {
        await onUpdateUser(values);
        refetch();
        toast({
          title: "ユーザー情報を更新しました",
        });
      } catch (error) {
        toast({
          title: "ユーザー情報の更新に失敗しました",
          status: "error",
        });
      }
    },
    [onUpdateUser, refetch, toast]
  );

  const handleSubmit = form.handleSubmit((values) => onSubmit(values));

  return (
    <form onSubmit={handleSubmit}>
      <UserSettingsForm form={form} isLoading={isLoading} />
    </form>
  );
};
