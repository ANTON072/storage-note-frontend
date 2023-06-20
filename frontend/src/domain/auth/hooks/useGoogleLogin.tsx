import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { firebaseGetAuth } from "@/domain/application";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export const useGoogleLogin = () => {
  const auth = firebaseGetAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const toast = useToast();

  const onGoogleLogin = async () => {
    await signInWithPopup(auth, provider);
    navigate("/app");
    toast({ title: "ログインしました" });
  };

  return { onGoogleLogin };
};
