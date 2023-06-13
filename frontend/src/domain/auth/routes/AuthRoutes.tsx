import { Outlet, useLoaderData } from "react-router-dom";

export const AuthRoutes = () => {
  const data = useLoaderData() as any;

  console.log("data", data);
  return <Outlet />;
};
