import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { useFirebaseStorage, type AppState } from "@/domain/application";

import { useUser } from "..";
import { CreateUserForm } from "../components/CreateUserForm";
import { appUserSchema, type AppUser } from "../types";

export const CreateUserFormContainer = () => {
  const { user } = useUser();

  const firebaseUser = useSelector((state: AppState) => state.user.firebase);

  const { uploadImage } = useFirebaseStorage();

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
    useCallback(
      (values: AppUser) => {
        console.log("values", values);
        uploadImage({
          url: values.photoURL,
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [firebaseUser]
    )
  );

  return (
    <form onSubmit={handleSubmit}>
      <CreateUserForm form={userForm} />
    </form>
  );
};
