import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import type { AppState } from "@/domain/application";

import { useUser } from "..";
import { useCreateUser } from "../api/useCreateUser";
import { CreateUserForm } from "../components/CreateUserForm";
import { appUserSchema, type AppUser } from "../types";

export const CreateUserFormContainer = () => {
  const { user, refetch } = useUser();

  const firebaseUser = useSelector((state: AppState) => state.user.firebase);

  const { onCreateUser, isLoading } = useCreateUser();

  const navigate = useNavigate();

  const toast = useToast();

  const name = user?.name;

  const defaultValues: AppUser = {
    name: name || "",
    photoUrl: name ? user.photoUrl : firebaseUser?.photoURL || "",
  };

  const form = useForm<AppUser>({
    defaultValues,
    resolver: yupResolver(appUserSchema),
  });

  const onSubmit = useCallback(
    async (values: AppUser) => {
      try {
        await onCreateUser(values);
        refetch();
        navigate("/");
        toast({
          title: "Storage Noteへようこそ！",
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data.errors[0].detail;
          form.setError("name", {
            type: "validate",
            message,
          });
        } else if (error instanceof FirebaseError) {
          form.setError("photoUrl", {
            type: "validate",
            message: error.message,
          });
        } else {
          console.error(error);
        }
      }
    },
    [form, navigate, onCreateUser, refetch, toast]
  );

  const handleSubmit = form.handleSubmit((values) => onSubmit(values));

  return (
    <form onSubmit={handleSubmit}>
      <CreateUserForm form={form} isLoading={isLoading} />
    </form>
  );
};
