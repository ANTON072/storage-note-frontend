import { AppProviderContainer } from "@/domain/application";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootRoutes } from "@/domain/application";
import {
  AuthRoutes,
  AuthFormRootRoutes,
  LoginRoutes,
  RegisterRoutes,
  PasswordReminderRoutes,
} from "@/domain/auth";
import { HomeRoutes } from "@/domain/home";
import { DashboardRoute } from "@/domain/dashboard";

const router = createBrowserRouter([
  {
    element: <RootRoutes />,
    children: [
      // 公開ページ
      {
        path: "/",
        element: <HomeRoutes />,
      },
      // 認証が必要なページ
      {
        element: <AuthRoutes />,
        children: [
          {
            path: "/app",
            element: <DashboardRoute />,
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
          {
            path: "/auth/password-reminder",
            element: <PasswordReminderRoutes />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AppProviderContainer>
      <RouterProvider router={router} />
    </AppProviderContainer>
  );
}

export default App;
