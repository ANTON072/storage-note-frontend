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
} from "@chakra-ui/react";

import type { AppUser } from "@/domain/users/types";

type Props = {
  onLogout: () => void;
  user: AppUser | null;
};

export const AvatarMenu = ({ onLogout, user }: Props) => {
  const photUrl = user?.photoUrl;

  return (
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
            <MenuItem as={BrowserLink} to="/user/settings">
              ユーザー設定
            </MenuItem>
          )}
          <MenuDivider />
          <MenuItem onClick={onLogout}>ログアウト</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
