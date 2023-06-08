import { Outlet, ScrollRestoration } from "react-router-dom";
import { AppHeaderContainer, AppFooter } from "@/domain/application";

export const RootRoutes = () => {
  return (
    <>
      <AppHeaderContainer />
      <Outlet />
      <ScrollRestoration />
      <AppFooter />
    </>
  );
};
