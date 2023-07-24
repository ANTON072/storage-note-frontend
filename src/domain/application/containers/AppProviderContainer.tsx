import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "../redux/store";

type Props = {
  children: React.ReactNode;
};

const RETRY_COUNT = import.meta.env.VITE_APP_ENV === "development" ? 0 : 3;

const useErrorBoundary = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      return error.response?.status >= 500;
    }
  }
  return false;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      useErrorBoundary,
      retry: RETRY_COUNT,
    },
    mutations: {
      useErrorBoundary,
      retry: RETRY_COUNT,
    },
  },
});

export const AppProviderContainer = ({ children }: Props) => {
  const theme = extendTheme({
    styles: {
      global: {
        "html, body": {
          height: "100%",
        },
        "#root": {
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          height: "100%",
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <HelmetProvider>{children}</HelmetProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
