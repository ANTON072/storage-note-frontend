import { useCallback } from "react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { setError } from "..";

import type { AppState } from "..";

export const AppGlobalErrorContainer = () => {
  const dispatch = useDispatch();

  const error = useSelector((state: AppState) => state.common.error);

  const handleClose = useCallback(() => {
    dispatch(setError(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!error) return null;

  return (
    <Box width={`100%`}>
      <Alert status="error" width={`100%`}>
        <AlertIcon />
        <Box width={`100%`}>
          {!!error.title && <AlertTitle>{error.title}</AlertTitle>}
          <AlertDescription>{error.message}</AlertDescription>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={handleClose}
        />
      </Alert>
    </Box>
  );
};
