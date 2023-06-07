import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "../../redux/store";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <ChakraProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ChakraProvider>
  );
};
