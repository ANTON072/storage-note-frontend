/* eslint-disable @typescript-eslint/no-unused-vars */
// See: https://chakra-templates.dev/navigation/navbar
import { Link as RouterLink } from "react-router-dom";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
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
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import type { AppUser } from "@/domain/users/types";

import { APP_NAME } from "../../constants";

import { AvatarMenu } from "./AvatarMenu";
import { LoginStack } from "./LoginStack";

type Props = {
  user: AppUser | null;
  isLoggedIn: boolean;
  onLogout: () => Promise<void>;
};

export const AppHeader = ({ user, isLoggedIn, onLogout }: Props) => {
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
            <RouterLink to={`/`}>{APP_NAME}</RouterLink>
          </Text>
          {/* メニュー */}
          {/* See: https://chakra-templates.dev/navigation/navbar */}
          {/* <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <div>ストレージ</div>
            <div>ストレージ</div>
          </Flex> */}
        </Flex>

        {/* 右メニュー */}
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {isLoggedIn ? (
            <AvatarMenu user={user} onLogout={onLogout} />
          ) : (
            <LoginStack />
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
