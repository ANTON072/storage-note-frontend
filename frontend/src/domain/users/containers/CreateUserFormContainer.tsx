import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { type AppState } from "@/domain/application";

import { useUser } from "..";
import { useCreateUser } from "../api/useCreateUser";
import { CreateUserForm } from "../components/CreateUserForm";
import { appUserSchema, type AppUser } from "../types";

export const CreateUserFormContainer = () => {
  const { user } = useUser();

  const firebaseUser = useSelector((state: AppState) => state.user.firebase);

  const { onCreateUser, isLoading } = useCreateUser();

  const userId = user?.userId;

  const defaultValues: AppUser = {
    userId: userId || "",
    photoURL: userId ? user.photoURL : firebaseUser?.photoURL || "",
  };

  const userForm = useForm<AppUser>({
    defaultValues,
    resolver: yupResolver(appUserSchema),
  });

  const handleSubmit = userForm.handleSubmit(onCreateUser);

  return (
    <form onSubmit={handleSubmit}>
      <CreateUserForm form={userForm} isLoading={isLoading} />
    </form>
  );
};
