import { useState } from "react";

import { useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  updateEmail,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import type { AppState } from "@/domain/application";
import {
  localizeFirebaseErrorMessage,
  firebaseGetAuth,
  useReauthenticate,
} from "@/domain/application";
import {
  passwordLoginSchema,
  type PasswordLoginValues,
} from "@/domain/auth/types";

import { ChangeLoginForm } from "../components/ChangeLoginForm";

export const ChangeLoginFormContainer = () => {
  const { reauthenticate } = useReauthenticate();

  const [isMailLoading, setMailLoading] = useState(false);

  const firebaseUser = useSelector((state: AppState) => state.user.firebase);

  const toast = useToast();

  const mailForm = useForm<PasswordLoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(passwordLoginSchema),
  });

  const onMailSubmit = mailForm.handleSubmit(async (values) => {
    const auth = firebaseGetAuth();
    const user = auth.currentUser;
    if (!user) {
      toast({ title: "ユーザーが存在しません", status: "error" });
      return;
    }
    try {
      setMailLoading(true);
      // 再認証
      await reauthenticate(values.password);
      // メアド更新
      await updateEmail(auth.currentUser, values.email);
      // 再認証メール送信
      await sendEmailVerification(auth.currentUser);
      toast({
        title: "確認メールを送信しました",
      });
    } catch (error) {
      let errorTitle = `メールアドレスの登録に失敗しました`;
      if (error instanceof Error) {
        errorTitle = localizeFirebaseErrorMessage(error.message);
      }
      toast({ title: errorTitle, status: "error" });
    } finally {
      setMailLoading(false);
    }
  });

  const onPasswordChange = async () => {
    const auth = firebaseGetAuth();
    const user = auth.currentUser;
    const email = firebaseUser?.email;
    if (!user || !email) {
      toast({ title: "ユーザーが存在しません", status: "error" });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast({ title: "パスワードの変更手続きをメールしました" });
    } catch (error) {
      let errorTitle = `パスワードの変更に失敗しました`;
      if (error instanceof Error) {
        errorTitle = localizeFirebaseErrorMessage(error.message);
      }
      toast({ title: errorTitle, status: "error" });
    }
  };

  return (
    <ChangeLoginForm
      mailForm={mailForm}
      onMailSubmit={onMailSubmit}
      isMailLoading={isMailLoading}
      onPasswordChange={onPasswordChange}
    />
  );
};
