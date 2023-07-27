import { useCallback } from "react";

import { useSelector } from "react-redux";

import type { AppState } from "@/domain/application";
import type { StorageResponse } from "@/domain/storage";

export const useUser = () => {
  const appUser = useSelector((state: AppState) => state.user.appUser);
  const firebaseUser = useSelector((state: AppState) => state.user.firebase);

  const isOwner = useCallback(
    (members: StorageResponse["members"]) => {
      if (!appUser) return false;

      return !!members
        .filter((member) => member.isOwner)
        .find((member) => member.name === appUser.name);
    },
    [appUser]
  );

  return {
    appUser,
    firebaseUser,
    isFirebaseLoggedIn: !!firebaseUser,
    isAppLoggedIn: !!appUser,
    isOwner,
  };
};
