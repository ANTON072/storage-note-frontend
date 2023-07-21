import { useCallback, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { API_BASE_URL, SuggestField, appApi } from "@/domain/application";
import type { Option } from "@/domain/application/components/SuggestField";

import { UserIdTag } from "../components/UserIdTag";

import type { AppUser } from "../types";

export const useSuggestUsers = () => {
  const [selectList, setSelectList] = useState<AppUser[]>([]);

  const SuggestUsers: React.FC = () => {
    const [inputText, setInputText] = useState("");

    const selectListNames = selectList.map((user) => user.name);

    const usersQuery = useQuery(
      ["users", inputText],
      async () => {
        const res = await appApi.get<AppUser[]>(
          `${API_BASE_URL}/v1/users/search`,
          {
            params: { name: inputText },
          }
        );

        return res.data;
      },
      {
        enabled: inputText.length >= 3,
      }
    );

    const searchedUsers = usersQuery.data || [];

    const displayUsers = searchedUsers.filter((user) => {
      return !selectListNames.includes(user.name);
    });

    const handleCloseTag = useCallback((name: string) => {
      const newList = selectList.filter((user) => user.name !== name);
      setSelectList(newList);
    }, []);

    return (
      <Box>
        <SuggestField
          inputText={inputText}
          setInputText={setInputText}
          placeholder="ユーザーIDを入力してください"
          onSelectItem={(option: Option) => {
            const user: AppUser = {
              name: option.text,
              photoUrl: option.icon,
            };
            setSelectList([...selectList, user]);
            setInputText("");
          }}
          options={displayUsers.map((user) => {
            return {
              id: user.name,
              text: user.name,
              icon: user.photoUrl,
            };
          })}
        />
        <Flex mt={2} flexWrap={`wrap`} gap={2}>
          {selectList.map((user) => (
            <UserIdTag
              key={user.name}
              userId={user.name}
              userImage={user.photoUrl}
              onClose={() => handleCloseTag(user.name)}
            />
          ))}
        </Flex>
      </Box>
    );
  };

  return { SuggestUsers, selectList, setSelectList };
};
