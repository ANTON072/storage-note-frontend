import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setFirebaseUser } from "@/domain/users";
import { setIdToken } from "@/domain/auth";

import { firebaseSignOut } from "..";

export const useLogout = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(async () => {
    await firebaseSignOut();
    return new Promise((resolve) => {
      dispatch(setFirebaseUser(null));
      dispatch(setIdToken(""));
      resolve(`delete user`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { onLogout };
};
