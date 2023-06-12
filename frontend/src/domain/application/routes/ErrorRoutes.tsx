import { useToast } from "@chakra-ui/react";
import { useNavigate, useRouteError } from "react-router-dom";

import { AuthError } from "@/domain/application";
import { useEffect } from "react";

const TOAST_ID = "auth-error";

export const ErrorRoutes = () => {
  const error = useRouteError();

  const toast = useToast();

  const navigate = useNavigate();

  // Mounted
  useEffect(() => {
    if (error instanceof AuthError) {
      if (!toast.isActive(TOAST_ID)) {
        navigate("/auth/login");
        toast({
          title: "ユーザー認証に失敗しました",
          status: "error",
          id: TOAST_ID,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.error(error);
  return null;
};
