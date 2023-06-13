import { onAuthStateChanged } from "firebase/auth";

import { firebaseGetAuth, AuthError } from "@/domain/application";

export const nonAuthLoader = async () => {
  const auth = firebaseGetAuth();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      // ログイン済みユーザーはappへリダイレクトさせる
      if (user && user.emailVerified) {
        reject(new AuthError("LOGGED_IN"));
        return;
      }
      resolve(null);
    });
  });
};
