import { Link as BrowserLink } from "react-router-dom";

import {
  Flex,
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  Text,
  HStack,
  useBreakpoint,
} from "@chakra-ui/react";

import type { AppUser } from "@/domain/users/types";

type Props = {
  onLogout: () => void;
  user: AppUser | null;
};

export const AvatarMenu = ({ onLogout, user }: Props) => {
  const photUrl = user?.photoUrl;

  const breakpoint = useBreakpoint();

  return (
    <HStack>
      <Text color={`gray.500`} display={{ sm: "none", md: "block" }}>
        {user?.name}
      </Text>
      <Flex alignItems={"center"}>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar key={photUrl} size={"sm"} src={photUrl} />
          </MenuButton>
          <MenuList>
            {user && (
              <MenuGroup title={breakpoint === "sm" ? user.name : ""}>
                <MenuItem as={BrowserLink} to="/user/settings">
                  ユーザー設定
                </MenuItem>
              </MenuGroup>
            )}
            {user && <MenuDivider />}
            <MenuItem onClick={onLogout}>ログアウト</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};
