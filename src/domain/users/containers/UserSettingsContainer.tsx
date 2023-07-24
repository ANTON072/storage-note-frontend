import { useCallback, useState } from "react";

import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import { useFirebaseStorage, appApi, API_BASE_URL } from "@/domain/application";

import { useUser, setAppUser } from "..";
import { UserSettingsForm } from "../components/UserSettingsForm";
import { appUserSchema, type AppUser } from "../types";
export const UserSettingsContainer = () => {
  const { appUser } = useUser();

  const toast = useToast();

  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const { uploadImage } = useFirebaseStorage();

  const defaultValues: AppUser = {
    name: appUser?.name || "",
    photoUrl: appUser?.photoUrl || "",
  };

  const form = useForm<AppUser>({
    defaultValues,
    resolver: yupResolver(
      yup.object({
        photoUrl: appUserSchema.fields.photoUrl,
      })
    ),
  });

  const onUpdateUser = useCallback(async (values: AppUser) => {
    const photoUrl = await uploadImage({
      url: values.photoUrl || "",
      directory: "/images/user",
    });
    const response = await appApi.patch<AppUser>(`${API_BASE_URL}/v1/user`, {
      photoUrl,
    });

    return response.data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = useCallback(
    async (values: AppUser) => {
      try {
        setLoading(true);
        const user = await onUpdateUser(values);
        dispatch(setAppUser(user));
        toast({
          title: "ユーザー情報を更新しました",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "ユーザー情報の更新に失敗しました",
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSubmit = form.handleSubmit((values) => onSubmit(values));

  return (
    <form onSubmit={handleSubmit}>
      <UserSettingsForm form={form} isLoading={isLoading} />
    </form>
  );
};
