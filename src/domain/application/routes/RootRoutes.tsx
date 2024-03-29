import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import { Box, Spinner, Flex } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import {
  AppHeaderContainer,
  AppFooter,
  firebaseGetAuth,
  useUserQuery,
} from "@/domain/application";
import { setIdToken } from "@/domain/auth";
import { setAppUser, setFirebaseUser } from "@/domain/users";

import type { User } from "firebase/auth";

export const RootRoutes = () => {
  const auth = firebaseGetAuth();

  const dispatch = useDispatch();

  const [isFetched, setFetched] = useState(false);

  const { setFetch: setUserQueryFetch } = useUserQuery({
    onSuccess: (user) => {
      setFetched(true);
      dispatch(setAppUser(user));
    },
    onError: (error) => {
      console.log(error);
      setFetched(true);
    },
  });

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
      // 初回アクセス前はローディング画面を表示する
      if (!isFetched) {
        setUserQueryFetch(true);
      }
    };

    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setFetched(false);
        // ログイン時の処理
        fetchUserData(firebaseUser);
      } else {
        // 未ログイン時の処理
        setFetched(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isFetched) {
    return (
      <Flex
        w={`100vw`}
        h={`100vh`}
        bg={`white`}
        align={`center`}
        justify={`center`}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <>
      <Box>
        <AppHeaderContainer />
      </Box>
      <Box as="main">
        <Outlet />
      </Box>
      <AppFooter />
      <ScrollRestoration />
    </>
  );
};
