import { HStack, IconButton, Text } from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";

export const Counter = () => {
  return (
    <HStack justifyContent={`flex-end`}>
      <IconButton
        size={`xs`}
        aria-label="減らす"
        rounded={`full`}
        icon={<FaMinus />}
        colorScheme="teal"
      />
      <Text fontWeight={`bold`}>111個</Text>
      <IconButton
        size={`xs`}
        aria-label="増やす"
        rounded={`full`}
        icon={<FaPlus />}
        colorScheme="teal"
      />
    </HStack>
  );
};
