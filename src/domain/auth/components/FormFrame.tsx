import {
  Flex,
  useColorModeValue,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export const FormFrame = ({ children }: Props) => {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      height={`100%`}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        minW={useBreakpointValue({ base: "100%", md: "lg" })}
        maxW={"lg"}
        py={12}
        px={6}
      >
        {children}
      </Stack>
    </Flex>
  );
};
