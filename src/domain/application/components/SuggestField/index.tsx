import type { ElementRef } from "react";
import { useEffect, useRef, useState } from "react";

import { Box, Input } from "@chakra-ui/react";

import { SuggestListItem } from "./SuggestListItem";

import type { InputProps } from "@chakra-ui/react";

type Props = InputProps & {
  options: Option[];
  inputText: string;
  setInputText: (text: string) => void;
  onSelectItem: (option: Option) => void;
};

export type Option = { id: string | number; text: string; icon?: string };

export const SuggestField = ({
  placeholder,
  options,
  inputText,
  setInputText,
  onSelectItem,
}: Props) => {
  const [isFocus, setFocus] = useState(false);

  const suggestRef = useRef<ElementRef<"div">>(null);

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
        onChange={(e) => [setInputText(e.target.value)]}
        value={inputText}
      />
      {options.length > 0 && (
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
            <SuggestListItem
              key={option.id}
              label={option.text}
              icon={option.icon}
              onClick={() => {
                setFocus(false);
                onSelectItem(option);
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
