import { Search2Icon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
  Select,
  Stack,
  HStack,
  FormControl,
  FormLabel,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

export const ItemSearch = () => {
  return (
    <Card variant={`outline`}>
      <CardBody>
        <Stack>
          <FormControl>
            <FormLabel>ストック名検索</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Search2Icon color="gray.600" />
              </InputLeftElement>
              <Input type="search"></Input>
            </InputGroup>
          </FormControl>

          <HStack>
            <FormControl>
              <FormLabel>並び順</FormLabel>
              <Select>
                <option value="option1">登録日が新しい</option>
                <option value="option2">登録日が古い</option>
                <option value="option3">更新日が新しい</option>
                <option value="option3">更新日が古い</option>
                <option value="option3">在庫が少ない</option>
                <option value="option3">在庫が多い</option>
                <option value="option3">お気に入り</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>カテゴリー選択</FormLabel>
              <Select>
                <option value="option1">未選択</option>
                <option value="option2">キッチン</option>
                <option value="option3">トイレ</option>
                <option value="option3">お風呂</option>
              </Select>
            </FormControl>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};
