import { useCallback, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";

import { Autocomplete } from "@/domain/application";

import { UserIdTag } from "../components/UserIdTag";

export const useSuggestUsers = () => {
  const SuggestUsers: React.FC = () => {
    const [inputText, setInputText] = useState("");

    const handleCloseTag = useCallback(() => {
      //
    }, []);

    return (
      <Box>
        <Autocomplete
          inputText={inputText}
          setInputText={setInputText}
          placeholder="ユーザーIDを入力してください"
          noResultText="ユーザーIDが存在しません"
          options={[
            { id: 1, text: "React" },
            { id: 2, text: "Ruby on Rails" },
            { id: 3, text: "JavaScript" },
            { id: 4, text: "TypeScript" },
            { id: 5, text: "Go" },
            { id: 6, text: "HTML" },
            { id: 7, text: "CSS" },
          ]}
        />
        <Flex mt={2} flexWrap={`wrap`} gap={2}>
          <UserIdTag userId="xxx" onClose={handleCloseTag} />
          <UserIdTag userId="vvvvvvvvvv" onClose={handleCloseTag} />
          <UserIdTag userId="hhhhhhh" onClose={handleCloseTag} />
        </Flex>
      </Box>
    );
  };

  return { SuggestUsers };
};
