import { Outlet, ScrollRestoration } from "react-router-dom";

import { Box } from "@chakra-ui/react";

import { AppHeaderContainer, AppFooter } from "@/domain/application";

export const RootRoutes = () => {
  return (
    <>
      <AppHeaderContainer />
      <Box as="main">
        <Outlet />
      </Box>
      <AppFooter />
      <ScrollRestoration />
    </>
  );
};
