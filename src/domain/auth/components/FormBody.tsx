import { Box, useColorModeValue } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export const FormBody = ({ children }: Props) => {
  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
    >
      {children}
    </Box>
  );
};
