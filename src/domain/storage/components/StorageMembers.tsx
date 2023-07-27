import { AddIcon } from "@chakra-ui/icons";
import { Avatar, IconButton, Wrap, WrapItem, Tooltip } from "@chakra-ui/react";

import type { StorageResponse } from "..";

type Props = {
  storage: StorageResponse;
  isOwner: boolean;
  onOpenDrawer: () => void;
};

export const StorageMembers = ({ storage, isOwner, onOpenDrawer }: Props) => {
  return (
    <Wrap flex={1}>
      {storage.members.map((member) => (
        <WrapItem key={member.name}>
          <Tooltip label={member.name}>
            <Avatar size={`sm`} src={member.photoUrl} />
          </Tooltip>
        </WrapItem>
      ))}
      {isOwner && (
        <WrapItem>
          <IconButton
            aria-label="メンバーの追加"
            icon={<AddIcon />}
            rounded={`full`}
            size={`sm`}
            onClick={onOpenDrawer}
          ></IconButton>
        </WrapItem>
      )}
    </Wrap>
  );
};
