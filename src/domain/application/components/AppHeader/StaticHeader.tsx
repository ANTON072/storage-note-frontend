import { Box, Flex, useBreakpointValue, Text } from "@chakra-ui/react";

import { APP_NAME } from "../../constants";

export const StaticHeader = () => {
  return (
    <Box as="header">
      <Flex
        bg="white"
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor="gray.200"
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            as="h1"
            fontWeight="bold"
          >
            {APP_NAME}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
