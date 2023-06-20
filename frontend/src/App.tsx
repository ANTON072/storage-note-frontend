import { AppProviderContainer } from "@/domain/application";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootRoutes, ErrorRoutes } from "@/domain/application";
import {
  AuthRoutes,
  AuthFormRootRoutes,
  LoginRoutes,
  RegisterRoutes,
  PasswordReminderRoutes,
  authLoader,
  nonAuthLoader,
} from "@/domain/auth";
import { HomeRoutes } from "@/domain/home";
import { DashboardRoute } from "@/domain/dashboard";
import { SettingsHomeRoutes } from "@/domain/users";

const router = createBrowserRouter([
  {
    element: <RootRoutes />,
    errorElement: <ErrorRoutes />,
    children: [
      // 公開ページ
      {
        path: "/",
        element: <HomeRoutes />,
      },
      // 認証が必要なページ
      {
        element: <AuthRoutes />,
        loader: authLoader,
        children: [
          {
            path: "/app",
            element: <DashboardRoute />,
          },
          {
            path: "/app/settings",
            element: <SettingsHomeRoutes />,
          },
        ],
      },
      {
        // 認証フォーム系
        element: <AuthFormRootRoutes />,
        loader: nonAuthLoader,
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
