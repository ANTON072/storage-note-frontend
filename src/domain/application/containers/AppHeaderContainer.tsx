import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import type { AppState } from "@/domain/application";
import { useLogout } from "@/domain/application";

import { AppHeader } from "../components/AppHeader";

export const AppHeaderContainer = () => {
  const navigate = useNavigate();

  const toast = useToast();

  const appUser = useSelector((state: AppState) => state.user.appUser);
  const firebaseUser = useSelector((state: AppState) => state.user.firebase);

  const { onLogout } = useLogout();

  const handleLogout = useCallback(async () => {
    await onLogout();
    navigate("/auth/login");
    toast({
      title: "ログアウトしました",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppHeader
      user={appUser}
      isLoggedIn={!!firebaseUser}
      onLogout={handleLogout}
    />
  );
};
