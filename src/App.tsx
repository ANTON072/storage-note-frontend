import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  AppProviderContainer,
  ErrorBoundary,
  RootRoutes,
} from "@/domain/application";
import {
  AuthRoute,
  AuthFormRootRoute,
  LoginRoute,
  RegisterRoute,
  PasswordReminderRoute,
} from "@/domain/auth";
import { DashboardRoute } from "@/domain/dashboard";
import { UserSettingsRoute, CreateUserRoute } from "@/domain/users";

import { PageNotFound } from "./domain/application/components/PageNotFound";

const router = createBrowserRouter([
  {
    element: <RootRoutes />,
    errorElement: <ErrorBoundary />,
    children: [
      // 認証が必要なページ
      {
        children: [
          // app
          {
            element: <AuthRoute />,
            children: [
              {
                path: "/",
                element: <DashboardRoute />,
              },
              {
                path: "/user/settings",
                element: <UserSettingsRoute />,
              },
            ],
          },
          // ユーザー登録
          {
            path: "/create-user",
            element: <CreateUserRoute />,
          },
          {
            path: "*",
            element: <PageNotFound />,
          },
        ],
      },
      {
        // 認証フォーム系
        element: <AuthFormRootRoute />,
        children: [
          {
            path: "/auth/login",
            element: <LoginRoute />,
          },
          {
            path: "/auth/register",
            element: <RegisterRoute />,
          },
          {
            path: "/auth/password-reminder",
            element: <PasswordReminderRoute />,
          },
          {
            path: "*",
            element: <PageNotFound />,
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
