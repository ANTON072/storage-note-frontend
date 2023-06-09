import { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertStatus,
  Box,
} from "@chakra-ui/react";

export type FlashMessageState = {
  title?: string;
  description: string;
  status?: AlertStatus;
};

export const useFlashMessage = () => {
  const [flashMessageState, setFlashMessageState] =
    useState<FlashMessageState | null>(null);

  const FlashMessage: React.FC = () => {
    if (!flashMessageState) return null;

    const { title, description, status } = flashMessageState;

    return (
      <Alert status={status || "info"}>
        <AlertIcon />
        <Box>
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{description}</AlertDescription>
        </Box>
      </Alert>
    );
  };

  return {
    FlashMessage,
    setFlashMessageState,
    flashMessageState,
  };
};
