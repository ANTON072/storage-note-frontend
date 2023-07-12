import { Avatar, Box, Flex } from "@chakra-ui/react";

type Props = {
  label: string;
  icon?: string;
  onClick: () => void;
};

export const SuggestListItem = ({ label, onClick, icon }: Props) => {
  return (
    <Flex
      cursor={`pointer`}
      px={2}
      py={2}
      _hover={{
        bg: "gray.200",
      }}
      onClick={onClick}
      gap={2}
      alignItems={`center`}
    >
      {icon && <Avatar src={icon} size={`sm`} />}
      <Box>{label}</Box>
    </Flex>
  );
};
