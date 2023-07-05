import { useCallback } from "react";

import { useDispatch } from "react-redux";

import { setIdToken } from "@/domain/auth";
import { setAppUser, setFirebaseUser } from "@/domain/users";

import { firebaseSignOut } from "..";

export const useLogout = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(async () => {
    await firebaseSignOut();
    return new Promise((resolve) => {
      dispatch(setFirebaseUser(null));
      dispatch(setAppUser(null));
      dispatch(setIdToken(""));
      resolve(`logout`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { onLogout };
};
