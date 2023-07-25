import { AddIcon } from "@chakra-ui/icons";
import { Avatar, IconButton, Wrap, WrapItem, Tooltip } from "@chakra-ui/react";

export const StorageMembers = () => {
  return (
    <Wrap flex={1}>
      <WrapItem>
        <Tooltip label="Dan Abrahmov">
          <Avatar
            size={`sm`}
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
        </Tooltip>
      </WrapItem>
      <WrapItem>
        <Tooltip label="Kola Tioluwani">
          <Avatar
            size={`sm`}
            name="Kola Tioluwani"
            src="https://bit.ly/tioluwani-kolawole"
          />
        </Tooltip>
      </WrapItem>
      <WrapItem>
        <IconButton
          aria-label="メンバーの追加"
          icon={<AddIcon />}
          rounded={`full`}
          size={`sm`}
        ></IconButton>
      </WrapItem>
    </Wrap>
  );
};
