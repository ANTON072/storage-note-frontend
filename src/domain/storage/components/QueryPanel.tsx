import { Button, HStack } from "@chakra-ui/react";
import { BiSort, BiFilter, BiSearch } from "react-icons/bi";

export const QueryPanel = () => {
  return (
    <HStack justifyContent={`space-between`}>
      <Button color="gray.500" size="xs" w={`100%`} leftIcon={<BiSort />}>
        並び替え
      </Button>
      <Button color="gray.500" size="xs" w={`100%`} leftIcon={<BiFilter />}>
        絞り込み
      </Button>
      <Button color="gray.500" size="xs" w={`100%`} leftIcon={<BiSearch />}>
        検索
      </Button>
    </HStack>
  );
};
