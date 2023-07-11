import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import {
  API_BASE_URL,
  appApi,
  AppHeaderContainer,
  AppFooter,
  firebaseGetAuth,
  AppGlobalErrorContainer,
} from "@/domain/application";
import { setIdToken } from "@/domain/auth";
import { setAppUser, setFirebaseUser } from "@/domain/users";
import type { AppUser } from "@/domain/users/types";

import type { User } from "firebase/auth";

export const RootRoutes = () => {
  const auth = firebaseGetAuth();

  const dispatch = useDispatch();

  const [isFetched, setFetched] = useState(false);

  // Mounted
  useEffect(() => {
    const fetchUserData = async (firebaseUser: User) => {
      const idToken = await firebaseUser.getIdToken();
      dispatch(setIdToken(idToken));
      dispatch(
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
      if (!isFetched) {
        try {
          const { data } = await appApi.get<AppUser>(`${API_BASE_URL}/v1/user`);
          dispatch(setAppUser(data));
        } catch (error) {
          console.log(error);
        }
        setFetched(true);
      }
    };

    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        fetchUserData(firebaseUser);
      } else {
        setFetched(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isFetched) {
    // TODO: ローディング画面を表示
    return null;
  }

  return (
    <>
      <Box>
        <AppHeaderContainer />
        <AppGlobalErrorContainer />
      </Box>
      <Box as="main">
        <Outlet />
      </Box>
      <AppFooter />
      <ScrollRestoration />
    </>
  );
};
