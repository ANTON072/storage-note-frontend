import { Outlet, ScrollRestoration } from "react-router-dom";
import { AppHeaderContainer, AppFooter } from "@/domain/application";

export const RootRoutes = () => {
  return (
    <>
      <AppHeaderContainer />
      <main>
        <Outlet />
      </main>
      <AppFooter />
      <ScrollRestoration />
    </>
  );
};
