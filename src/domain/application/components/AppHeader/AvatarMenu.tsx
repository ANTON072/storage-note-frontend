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

import type { FirebaseUser } from "@/domain/users";

type Props = {
  photoUrl: FirebaseUser["photoURL"];
  onLogout: () => void;
};

export const AvatarMenu = ({ photoUrl, onLogout }: Props) => {
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
          <Avatar key={photoUrl} size={"sm"} src={photoUrl || undefined} />
        </MenuButton>
        <MenuList>
          <MenuItem as={BrowserLink} to="/app/user/settings">
            ユーザー設定
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={onLogout}>ログアウト</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
