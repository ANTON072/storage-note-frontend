import { useEffect, useRef, useState } from "react";

import { Box, Input, Text } from "@chakra-ui/react";

import type { InputProps } from "@chakra-ui/react";

type Props = InputProps & {
  options: Option[];
};

export type Option = { id: string | number; text: string };

export const Autocomplete = ({ placeholder, options }: Props) => {
  const [isFocus, setFocus] = useState(false);

  const [text, setText] = useState("");

  const suggestRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const suggestEl = suggestRef?.current;

    const drawerEl = document.querySelectorAll(
      ".chakra-modal__content-container"
    )[0];

    if (!drawerEl) return;

    const handleClickOutside = (e: Event) => {
      if (!suggestEl?.contains(e.target as Node)) {
        setFocus(false);
      }
    };

    drawerEl.addEventListener("click", handleClickOutside);

    if (!isFocus) {
      drawerEl.removeEventListener("click", handleClickOutside);
    }
  }, [suggestRef, isFocus]);

  return (
    <Box position={`relative`} ref={suggestRef}>
      <Input
        type="text"
        onFocus={() => {
          setFocus(true);
        }}
        placeholder={placeholder}
        onChange={(e) => [setText(e.target.value)]}
        value={text}
      />
      <Box
        w={`100%`}
        position={`absolute`}
        boxShadow={`0 2px 5px 2px rgba(0, 0, 0, 0.2)`}
        bg={`white`}
        mt={`5px`}
        borderRadius={`sm`}
        zIndex={1}
        style={{ display: isFocus ? "block" : "none" }}
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
    </Box>
  );
};
