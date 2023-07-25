import { AddIcon } from "@chakra-ui/icons";
import { Avatar, IconButton, Wrap, WrapItem } from "@chakra-ui/react";

export const StorageMembers = () => {
  return (
    <Wrap flex={1}>
      <WrapItem>
        <Avatar
          size={`sm`}
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
        />
      </WrapItem>
      <WrapItem>
        <Avatar
          size={`sm`}
          name="Kola Tioluwani"
          src="https://bit.ly/tioluwani-kolawole"
        />
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
