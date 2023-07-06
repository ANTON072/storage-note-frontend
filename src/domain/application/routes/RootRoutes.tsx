import { Outlet, ScrollRestoration } from "react-router-dom";

import { Box } from "@chakra-ui/react";

import {
  AppHeaderContainer,
  AppFooter,
  AppGlobalErrorContainer,
} from "@/domain/application";

export const RootRoutes = () => {
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
