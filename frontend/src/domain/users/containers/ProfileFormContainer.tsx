import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import type { AppState } from "@/domain/application";

import { useUser } from "..";
import { ProfileForm } from "../components/ProfileForm";
import { appUserSchema, type AppUser } from "../types";

export const ProfileFormContainer = () => {
  const { user } = useUser();
  const firebaseUser = useSelector((state: AppState) => state.user.firebase);

  const userId = user?.userId;

  const defaultValues: AppUser = {
    userId: userId || "",
    photoURL: userId ? user.photoURL : firebaseUser?.photoURL || "",
  };

  const userForm = useForm<AppUser>({
    defaultValues,
    resolver: yupResolver(appUserSchema),
  });

  const handleSubmit = userForm.handleSubmit(
    useCallback((values: AppUser) => {
      console.log("values", values);
    }, [])
  );

  return (
    <form onSubmit={handleSubmit}>
      <ProfileForm form={userForm} />
    </form>
  );
};
