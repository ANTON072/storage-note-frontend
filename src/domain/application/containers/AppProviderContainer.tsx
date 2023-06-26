import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "../redux/store";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

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
