import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { type AppState } from "@/domain/application";

import { useUser } from "..";
import { useCreateUser } from "../api/useCreateUser";
import { CreateUserForm } from "../components/CreateUserForm";
import { appUserSchema, type AppUser } from "../types";

export const CreateUserFormContainer = () => {
  const { user, refetch } = useUser();

  const firebaseUser = useSelector((state: AppState) => state.user.firebase);

  const { onCreateUser, isLoading } = useCreateUser();

  const name = user?.name;

  const defaultValues: AppUser = {
    name: name || "",
    photoUrl: name ? user.photoUrl : firebaseUser?.photoURL || "",
  };

  const userForm = useForm<AppUser>({
    defaultValues,
    resolver: yupResolver(appUserSchema),
  });

  const onSubmit = useCallback(
    async (values: AppUser) => {
      await onCreateUser(values);
      refetch();
    },
    [onCreateUser, refetch]
  );

  const handleSubmit = userForm.handleSubmit((values) => onSubmit(values));

  return (
    <form onSubmit={handleSubmit}>
      <CreateUserForm form={userForm} isLoading={isLoading} />
    </form>
  );
};
