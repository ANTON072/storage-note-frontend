import { Outlet, ScrollRestoration } from "react-router-dom";

export const RootRoutes = () => {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
};
