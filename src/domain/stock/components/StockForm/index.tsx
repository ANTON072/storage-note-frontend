import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Select,
  HStack,
  FormHelperText,
  Button,
  Divider,
} from "@chakra-ui/react";

export const StockForm = () => {
  return (
    <>
      <Drawer
        placement="right"
        onClose={() => {
          //
        }}
        isOpen={true}
        size={`md`}
      >
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">ストック新規追加</DrawerHeader>
          <DrawerBody>
            <form>
              <Stack py={2} spacing={2}>
                <FormControl isRequired>
                  <FormLabel>商品名</FormLabel>
                  <Input autoComplete="off" />
                </FormControl>
                <FormControl>
                  <FormLabel>写真</FormLabel>
                </FormControl>
                <FormControl>
                  <FormLabel>カテゴリー</FormLabel>
                  <Select>
                    <option value="">未設定</option>
                    <option value="">キッチン</option>
                    <option value="">お掃除</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>購入場所</FormLabel>
                  <Input autoComplete="off" placeholder="店舗名かURLを入力" />
                </FormControl>
                <FormControl>
                  <FormLabel>購入金額</FormLabel>
                  <Input autoComplete="off" placeholder="1,000円" />
                </FormControl>
                <HStack>
                  <FormControl isRequired>
                    <FormLabel>初期在庫数</FormLabel>
                    <Input type="number" defaultValue={0} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>単位</FormLabel>
                    <Input defaultValue={`個`} />
                  </FormControl>
                </HStack>
                <FormControl isRequired>
                  <FormLabel>在庫減少アラート通知個数</FormLabel>
                  <Input type="number" defaultValue={1} />
                  <FormHelperText>
                    この個数以下になるとアラート表示になります
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>メモ</FormLabel>
                  <Textarea resize={`vertical`} />
                </FormControl>
              </Stack>
              <Divider my={3} />
              <Button w={`100%`} colorScheme="blue" type="submit">
                新規追加
              </Button>
            </form>
          </DrawerBody>
        </DrawerContent>
        <DrawerOverlay />
      </Drawer>
    </>
  );
};