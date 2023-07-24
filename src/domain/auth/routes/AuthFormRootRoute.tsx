import { Outlet, Navigate } from "react-router-dom";

import { useUser } from "@/domain/users";

import { FormFrame } from "..";

export const AuthFormRootRoute = () => {
  const { appUser } = useUser();

  if (appUser) {
    return <Navigate to={`/`} />;
  }

  return (
    <FormFrame>
      <Outlet />
    </FormFrame>
  );
};
