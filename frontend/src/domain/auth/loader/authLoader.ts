import { onAuthStateChanged } from "firebase/auth";

import { firebaseGetAuth, AuthError, store } from "@/domain/application";
import { setFirebaseUser } from "@/domain/users";

import { setIdToken } from "..";

export const authLoader = async () => {
  const auth = firebaseGetAuth();

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        return reject(new AuthError("USER_NOT_FOUND"));
      }
      if (!firebaseUser.emailVerified) {
        return reject(new AuthError("EMAIL_NOT_VERIFIED"));
      }

      const idToken = await firebaseUser.getIdToken();
      // ストアにidTokenを保存
      store.dispatch(setIdToken(idToken));
      // ストアにfirebaseユーザー情報を保存
      store.dispatch(
        setFirebaseUser({
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          emailVerified: firebaseUser.emailVerified,
          metadata: {
            createdAt: firebaseUser.metadata.creationTime,
            lastLoginAt: firebaseUser.metadata.lastSignInTime,
          },
          photoURL: firebaseUser.photoURL,
          providerData: firebaseUser.providerData,
          providerId: firebaseUser.providerId,
          refreshToken: firebaseUser.refreshToken,
          tenantId: firebaseUser.tenantId,
          uid: firebaseUser.uid,
        })
      );

      resolve({
        firebaseUser,
      });
    });
  });
};
