import { useSelector } from "react-redux";

import type { AppState } from "@/domain/application";

export const useUser = () => {
  const appUser = useSelector((state: AppState) => state.user.appUser);
  const firebaseUser = useSelector((state: AppState) => state.user.firebase);

  return {
    appUser,
    firebaseUser,
    isFirebaseLoggedIn: !!firebaseUser,
    isAppLoggedIn: !!appUser,
  };
};
