import { Outlet, useLoaderData } from "react-router-dom";

export const AuthRoutes = () => {
  const data = useLoaderData();

  console.log("data", data);
  return <Outlet />;
};
