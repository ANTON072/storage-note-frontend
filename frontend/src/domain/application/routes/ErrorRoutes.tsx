import { useToast } from "@chakra-ui/react";
import { useNavigate, useRouteError } from "react-router-dom";

import { AuthError } from "@/domain/application";
import { useEffect } from "react";

const TOAST_ID = "auth-error";

export const ErrorRoutes = () => {
  const error = useRouteError();

  const toast = useToast();

  const navigate = useNavigate();

  const redirect = () => {
    navigate("/auth/login");
  };

  // Mounted
  useEffect(() => {
    if (error instanceof AuthError) {
      if (error.type === "EMAIL_NOT_VERIFIED") {
        if (!toast.isActive(TOAST_ID)) {
          redirect();
          toast({
            title: "ユーザー認証に失敗しました",
            status: "error",
            id: TOAST_ID,
          });
        }
        return;
      } else {
        redirect();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.error(error);
  return null;
};
