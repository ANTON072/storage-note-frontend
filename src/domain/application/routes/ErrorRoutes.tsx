import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

import { AuthError } from "@/domain/application";

const TOAST_ID = "auth-error";

export const ErrorRoutes = () => {
  const error = useRouteError();

  const toast = useToast();

  const navigate = useNavigate();

  // Mounted
  useEffect(() => {
    if (error instanceof AuthError) {
      if (error.type === "EMAIL_NOT_VERIFIED") {
        if (!toast.isActive(TOAST_ID)) {
          navigate("/auth/login");
          toast({
            title: "ユーザー認証に失敗しました",
            status: "error",
            id: TOAST_ID,
          });
        }
        return;
      } else if (error.type === "ALREADY_LOGGED_IN") {
        navigate("/");
        return;
      } else {
        navigate("/auth/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};