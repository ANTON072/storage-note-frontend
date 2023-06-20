import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

import { store } from "@/domain/application";
import { setIdToken } from "@/domain/auth";

import type { Auth} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const apps = getApps();

// すでにappが存在する場合は初期化しない
export const firebaseApp = !apps.length
  ? initializeApp(firebaseConfig)
  : getApp();

let authInstance: Auth;

// シングルトンパターン
export const firebaseGetAuth = () => {
  if (!authInstance) {
    authInstance = getAuth(firebaseApp);
  }
  return authInstance;
};

export const firebaseSignOut = () => {
  const auth = firebaseGetAuth();
  return signOut(auth);
};

export const refreshIdToken = async () => {
  const auth = firebaseGetAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error(`ユーザーが存在しません`);
  }
  const idToken = await currentUser?.getIdToken(true);

  return new Promise((resolve) => {
    store.dispatch(setIdToken(idToken));
    resolve(idToken);
  });
};
