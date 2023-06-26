import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { firebaseGetAuth } from "@/domain/application";

export const useGoogleLogin = () => {
  const auth = firebaseGetAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const toast = useToast();

  const onGoogleLogin = async () => {
    await signInWithPopup(auth, provider);
    navigate("/");
    toast({ title: "ログインしました" });
  };

  return { onGoogleLogin };
};
