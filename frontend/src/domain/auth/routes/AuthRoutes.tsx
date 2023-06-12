import { Suspense } from "react";
import { Await, Outlet, useLoaderData } from "react-router-dom";

export const AuthRoutes = () => {
  const data = useLoaderData() as any;

  console.log("data", data);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={data.idToken}>
        <Outlet />
      </Await>
    </Suspense>
  );
};
