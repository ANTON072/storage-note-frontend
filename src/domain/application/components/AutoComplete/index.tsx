import { useState } from "react";

import { Box, Input, Text } from "@chakra-ui/react";

import type { InputProps } from "@chakra-ui/react";

type Props = InputProps;

// 仮
const options = [
  { id: 1, text: "React" },
  { id: 2, text: "Ruby on Rails" },
  { id: 3, text: "JavaScript" },
  { id: 4, text: "TypeScript" },
  { id: 5, text: "Go" },
  { id: 6, text: "HTML" },
  { id: 7, text: "CSS" },
];

export const AutoComplete = ({ placeholder }: Props) => {
  const [isFocus, setFocus] = useState(false);

  const [text, setText] = useState("");

  return (
    <Box position={`relative`}>
      <Input
        type="text"
        onFocus={() => setFocus(true)}
        placeholder={placeholder}
        onChange={(e) => [setText(e.target.value)]}
        value={text}
      />
      {isFocus && (
        <Box
          w={`100%`}
          position={`absolute`}
          boxShadow={`0 2px 5px 2px rgba(0, 0, 0, 0.2)`}
          bg={`white`}
          mt={`5px`}
          borderRadius={`sm`}
          zIndex={1}
        >
          {options.map((option) => (
            <Text
              key={option.id}
              px={2}
              py={1}
              cursor={`pointer`}
              _hover={{
                bg: "gray.200",
              }}
              onClick={() => {
                setFocus(false);
              }}
            >
              {option.text}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  );
};
