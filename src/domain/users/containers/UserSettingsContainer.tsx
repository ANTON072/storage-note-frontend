import { useCallback } from "react";

import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import { setError } from "@/domain/application";

import { useUser } from "..";
// import { useCreateUser } from "../api/useCreateUser";
import { UserSettingsForm } from "../components/UserSettingsForm";
import { appUserSchema, type AppUser } from "../types";

export const UserSettingsContainer = () => {
  // const { user, refetch } = useUser();

  // const { onUpdateUser, isLoading } = useCreateUser();

  // const toast = useToast();

  // const dispatch = useDispatch();

  // const defaultValues: AppUser = {
  //   name: user?.name || "",
  //   photoUrl: user?.photoUrl || "",
  // };

  // const form = useForm<AppUser>({
  //   defaultValues,
  //   resolver: yupResolver(
  //     yup.object({
  //       photoUrl: appUserSchema.fields.photoUrl,
  //     })
  //   ),
  // });

  // const onSubmit = useCallback(
  //   async (values: AppUser) => {
  //     try {
  //       await onUpdateUser(values);
  //       refetch();
  //       toast({
  //         title: "ユーザー情報を更新しました",
  //       });
  //     } catch (error) {
  //       if (error instanceof AxiosError) {
  //         dispatch(setError(error));
  //       } else if (error instanceof FirebaseError) {
  //         form.setError("photoUrl", {
  //           type: "validate",
  //           message: error.message,
  //         });
  //       } else {
  //         console.error(error);
  //       }
  //     }
  //   },
  //   [dispatch, form, onUpdateUser, refetch, toast]
  // );

  // const handleSubmit = form.handleSubmit((values) => onSubmit(values));

  return (
    // <form onSubmit={handleSubmit}>
    //   <UserSettingsForm form={form} isLoading={isLoading} />
    // </form>
    <></>
  );
};
