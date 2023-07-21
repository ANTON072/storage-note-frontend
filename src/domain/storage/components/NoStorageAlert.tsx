import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

type Props = {
  createButton: React.ReactNode;
};

export const NoStorageAlert = ({ createButton }: Props) => {
  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        ストレージがありません
      </AlertTitle>
      <AlertDescription maxWidth="sm">{createButton}</AlertDescription>
    </Alert>
  );
};
