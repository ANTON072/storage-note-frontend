import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

export const NoResult = () => {
  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        No Stock!
      </AlertTitle>
      <AlertDescription maxWidth="sm">ストックがありません</AlertDescription>
    </Alert>
  );
};
