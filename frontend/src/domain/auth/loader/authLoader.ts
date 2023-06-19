import { onAuthStateChanged } from "firebase/auth";

import { firebaseGetAuth, AuthError, store } from "@/domain/application";
import { setIdToken } from "..";
import { setFirebaseUser } from "@/domain/users";

export const authLoader = async () => {
  const auth = firebaseGetAuth();

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        reject(new AuthError("USER_NOT_FOUND"));
        return;
      }
      if (!user.emailVerified) {
        reject(new AuthError("EMAIL_NOT_VERIFIED"));
        return;
      }

      const idToken = await user.getIdToken();
      store.dispatch(setIdToken(idToken));
      store.dispatch(
        setFirebaseUser({
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          metadata: {
            createdAt: user.metadata.creationTime,
            lastLoginAt: user.metadata.lastSignInTime,
          },
          photoURL: user.photoURL,
          providerData: user.providerData,
          providerId: user.providerId,
          refreshToken: user.refreshToken,
          tenantId: user.tenantId,
          uid: user.uid,
        })
      );
      resolve({
        user,
      });
    });
  });
};
