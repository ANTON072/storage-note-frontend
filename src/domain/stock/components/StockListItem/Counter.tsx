import { HStack, IconButton, Text } from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";

type Props = {
  displayCount: string;
  onCountChange: (upOrDown: "up" | "down") => void;
};

export const Counter = ({ displayCount, onCountChange }: Props) => {
  return (
    <HStack justifyContent={`flex-end`}>
      <IconButton
        size={`xs`}
        aria-label="減らす"
        rounded={`full`}
        icon={<FaMinus />}
        colorScheme="teal"
        onClick={() => onCountChange("down")}
      />
      <Text fontWeight={`bold`} minW={`50px`} textAlign={`center`}>
        {displayCount}
      </Text>
      <IconButton
        size={`xs`}
        aria-label="増やす"
        rounded={`full`}
        icon={<FaPlus />}
        colorScheme="teal"
        onClick={() => onCountChange("up")}
      />
    </HStack>
  );
};
