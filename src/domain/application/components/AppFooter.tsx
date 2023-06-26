import { Box, Text, Stack, Button, useBreakpointValue } from "@chakra-ui/react";

import { APP_NAME } from "..";

export const AppFooter = () => {
  return (
    <Box
      bg="white"
      borderTop={1}
      borderStyle={"solid"}
      borderColor="gray.200"
      py={{ base: 4, md: 8 }}
      px={{ base: 4 }}
    >
      <Stack
        justify="space-between"
        direction={useBreakpointValue({ base: "column", md: "row" })}
      >
        <Text
          fontSize="xs"
          textAlign={useBreakpointValue({ base: "center", md: "left" })}
        >{`Copyright © ${APP_NAME} All Rights Reserved.`}</Text>
        <Stack
          direction={"row"}
          justify={useBreakpointValue({ base: "center", md: "space-between" })}
        >
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"#"}
          >
            お問い合わせ
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
