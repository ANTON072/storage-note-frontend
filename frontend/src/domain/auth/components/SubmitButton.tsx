import { Button } from "@chakra-ui/react";

type Props = {
  children: string;
  isLoading: boolean;
};

export const SubmitButton = ({ children, isLoading }: Props) => {
  return (
    <Button
      loadingText="送信中"
      size="lg"
      bg={"blue.400"}
      color={"white"}
      _hover={{
        bg: "blue.500",
      }}
      type="submit"
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};
