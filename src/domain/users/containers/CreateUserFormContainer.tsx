import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

import { useFirebaseStorage, appApi, API_BASE_URL } from "@/domain/application";

import { setAppUser, useUser } from "..";
import { CreateUserForm } from "../components/CreateUserForm";
import { appUserSchema, type AppUser } from "../types";

export const CreateUserFormContainer = () => {
  const { firebaseUser } = useUser();

  const { uploadImage } = useFirebaseStorage();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const toast = useToast();

  const defaultValues: AppUser = {
    name: "",
    photoUrl: firebaseUser?.photoURL || "",
  };

  const form = useForm<AppUser>({
    defaultValues,
    resolver: yupResolver(appUserSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values: AppUser) => {
      const photoUrl = await uploadImage({
        url: values.photoUrl || "",
        namePrefix: "user_icon",
      });
      return appApi.post<AppUser>(`${API_BASE_URL}/v1/user`, {
        name: values.name,
        photoUrl,
      });
    },
    onSuccess: (response) => {
      dispatch(setAppUser(response.data));
      navigate("/");
      toast({
        title: "Storage Noteへようこそ！",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "ユーザー作成に失敗しました",
        status: "error",
      });
    },
  });

  const handleSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return (
    <form onSubmit={handleSubmit}>
      <CreateUserForm form={form} isLoading={mutation.isLoading} />
    </form>
  );
};
