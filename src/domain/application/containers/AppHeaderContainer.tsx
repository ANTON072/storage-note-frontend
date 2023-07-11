import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

import { useLogout } from "@/domain/application";
import { useUser } from "@/domain/users";

import { AppHeader } from "../components/AppHeader";

export const AppHeaderContainer = () => {
  const navigate = useNavigate();

  const toast = useToast();

  const { appUser, isFirebaseLoggedIn } = useUser();

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
      isLoggedIn={isFirebaseLoggedIn}
      onLogout={handleLogout}
    />
  );
};
