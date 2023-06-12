import { useSelector } from "react-redux";

import { type AppState, useLogout } from "@/domain/application";

import { AppHeader } from "../components/AppHeader";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export const AppHeaderContainer = () => {
  const navigate = useNavigate();

  const toast = useToast();

  const { onLogout } = useLogout();

  const firebaseUserState = useSelector(
    (state: AppState) => state.user.firebase
  );

  const handleLogout = useCallback(async () => {
    await onLogout();
    navigate("/auth/login");
    toast({
      title: "ログアウトしました",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AppHeader user={firebaseUserState} onLogout={handleLogout} />;
};
