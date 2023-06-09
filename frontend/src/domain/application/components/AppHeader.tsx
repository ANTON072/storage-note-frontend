// See: https://chakra-templates.dev/navigation/navbar
import {
  Box,
  Flex,
  IconButton,
  Text,
  Stack,
  Button,
  useColorModeValue,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

import { APP_NAME } from "../constants";

export const AppHeader = () => {
  // const { isOpen, onToggle } = useDisclosure();

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
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          {/* ハンバーガーメニュー */}
          {/* <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          /> */}
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            as="h1"
            fontWeight="bold"
          >
            <RouterLink to="/">{APP_NAME}</RouterLink>
          </Text>
          {/* メニュー */}
          {/* <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <div>Desktop Nav</div>
          </Flex> */}
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={RouterLink}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            to={"/auth/login"}
          >
            ログイン
          </Button>
          <Button
            as={RouterLink}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            to={"/auth/register"}
            _hover={{
              bg: "pink.300",
            }}
          >
            新規登録
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};
