import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import { store } from "../../redux/store";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export const AppProvider = ({ children }: Props) => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
