import { Outlet } from "react-router-dom";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { Stack, useBreakpointValue } from "@chakra-ui/react";

export const AuthFormRootRoutes = () => {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        minW={useBreakpointValue({ base: "100%", md: "lg" })}
        maxW={"lg"}
        py={12}
        px={6}
      >
        <Outlet />
      </Stack>
    </Flex>
  );
};
