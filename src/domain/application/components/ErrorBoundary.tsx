import { useMemo } from "react";
import { useRouteError } from "react-router-dom";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
  Box,
} from "@chakra-ui/react";
import { AxiosError } from "axios";

import { AppFooter, StaticHeader } from "..";

export const ErrorBoundary = () => {
  const error = useRouteError();

  const axiosError = useMemo(() => {
    if (error instanceof AxiosError) {
      return error;
    }
    return undefined;
  }, [error]);

  return (
    <>
      <StaticHeader />
      <Center>
        <Box>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {axiosError?.code}
            </AlertTitle>
            <AlertDescription maxWidth="md">
              {axiosError?.message}
            </AlertDescription>
          </Alert>
        </Box>
      </Center>
      <AppFooter />
    </>
  );
};
