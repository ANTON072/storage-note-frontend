import { Outlet, ScrollRestoration } from "react-router-dom";
import { AppHeaderContainer, AppFooter } from "@/domain/application";
import { Box } from "@chakra-ui/react";

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
