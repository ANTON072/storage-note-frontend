import { onAuthStateChanged } from "firebase/auth";

import { firebaseGetAuth, AuthError } from "@/domain/application";

export const authLoader = async () => {
  const auth = firebaseGetAuth();

  return new Promise((resolve, reject) => {
    // throw new Response("auth error", { status: 400 });

    onAuthStateChanged(auth, (user) => {
      console.log("user", user);

      if (user) {
        reject(new AuthError("invalid user"));
      }

      resolve({
        idToken: "idToken",
      });
    });
  });
};
