import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  useFirebaseStorage,
  appApi,
  API_BASE_URL,
  type AppState,
} from "@/domain/application";

import { setAppUser } from "..";
import { CreateUserForm } from "../components/CreateUserForm";
import { appUserSchema, type AppUser } from "../types";

export const CreateUserFormContainer = () => {
  const firebaseUser = useSelector((state: AppState) => state.user.firebase);

  const { uploadImage } = useFirebaseStorage();

  const [isLoading, setLoading] = useState(false);

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

  const onCreateUser = useCallback(async (values: AppUser) => {
    const photoUrl = await uploadImage({
      url: values.photoUrl || "",
      namePrefix: "user_icon",
    });
    const response = await appApi.post<AppUser>(`${API_BASE_URL}/v1/user`, {
      name: values.name,
      photoUrl,
    });

    return response.data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = useCallback(
    async (values: AppUser) => {
      try {
        setLoading(true);
        const user = await onCreateUser(values);
        dispatch(setAppUser(user));
        navigate("/");
        toast({
          title: "Storage Noteへようこそ！",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "ユーザー作成に失敗しました",
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
      <CreateUserForm form={form} isLoading={isLoading} />
    </form>
  );
};
