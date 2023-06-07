import { AppProvider } from "@/domain/application";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootRoutes } from "@/domain/application";
import {
  AuthRoutes,
  AuthFormRootRoutes,
  LoginRoutes,
  RegisterRoutes,
} from "@/domain/auth";
import { HomeRoutes } from "@/domain/home";

const router = createBrowserRouter([
  {
    element: <RootRoutes />,
    children: [
      {
        // 認証が必要なページ
        element: <AuthRoutes />,
        children: [
          {
            path: "/",
            element: <HomeRoutes />,
          },
        ],
      },
      {
        // 認証フォーム系
        element: <AuthFormRootRoutes />,
        children: [
          {
            path: "/auth/login",
            element: <LoginRoutes />,
          },
          {
            path: "/auth/register",
            element: <RegisterRoutes />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
