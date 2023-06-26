import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  AppProviderContainer,
  RootRoutes,
  ErrorRoutes,
} from "@/domain/application";
import {
  AuthRoute,
  AuthFormRootRoute,
  LoginRoute,
  RegisterRoute,
  PasswordReminderRoute,
  authLoader,
  nonAuthLoader,
} from "@/domain/auth";
import { DashboardRoute } from "@/domain/dashboard";
import { UserSettingsRoute, CreateUserRoute } from "@/domain/users";

const router = createBrowserRouter([
  {
    element: <RootRoutes />,
    errorElement: <ErrorRoutes />,
    children: [
      // 認証が必要なページ
      {
        loader: authLoader,
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
        ],
      },
      {
        // 認証フォーム系
        element: <AuthFormRootRoute />,
        loader: nonAuthLoader,
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
