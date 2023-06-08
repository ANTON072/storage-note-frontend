import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertStatus,
  Box,
} from "@chakra-ui/react";

type Props = {
  title?: string;
  description?: string;
  status?: AlertStatus;
};

export const FlashMessage = ({
  title,
  description,
  status = "info",
}: Props) => {
  if (!description) return null;

  return (
    <Alert status={status}>
      <AlertIcon />
      <Box>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{description}</AlertDescription>
      </Box>
    </Alert>
  );
};
