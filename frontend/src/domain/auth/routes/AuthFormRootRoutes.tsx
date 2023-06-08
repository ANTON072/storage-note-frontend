import { Outlet } from "react-router-dom";
import { Flex, useColorModeValue } from "@chakra-ui/react";

export const AuthFormRootRoutes = () => {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Outlet />
    </Flex>
  );
};
