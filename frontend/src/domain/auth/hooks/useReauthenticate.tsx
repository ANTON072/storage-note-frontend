/** Firebaseユーザーの再認証 */

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "@firebase/auth";

import { firebaseGetAuth } from "@/domain/application";

export const useReauthenticate = () => {
  const reauthenticate = async (password: string) => {
    const auth = firebaseGetAuth();
    const user = auth.currentUser;

    const credential = await EmailAuthProvider.credential(
      user?.email ?? "",
      password
    );

    if (!user) {
      return Promise.reject(`ユーザーが存在しません`);
    }

    return reauthenticateWithCredential(user, credential);
  };

  return {
    reauthenticate,
  };
};
