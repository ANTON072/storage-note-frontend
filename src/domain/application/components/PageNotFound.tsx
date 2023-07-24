import {
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";

export const PageNotFound = () => {
  return (
    <Center h={`100%`}>
      <Box>
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            ページが見つかりません
          </AlertTitle>
          <AlertDescription maxWidth="md">
            <Text fontSize={14} textAlign={`left`}>
              ご指定のURLが間違っているか、またはページが移動または削除された可能性があります。戻るボタンを使って前のページに戻るか、トップページから操作をお願いします。
            </Text>
            <Box my={5}>
              <Button as="a" href="/">
                トップページ
              </Button>
            </Box>
          </AlertDescription>
        </Alert>
      </Box>
    </Center>
  );
};
