import { Outlet } from "react-router-dom";

import { FormFrame } from "..";

export const AuthFormRootRoute = () => {
  return (
    <FormFrame>
      <Outlet />
    </FormFrame>
  );
};
