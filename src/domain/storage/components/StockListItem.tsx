import {
  Card,
  CardBody,
  Stack,
  Image,
  CardFooter,
  Heading,
  Text,
  Link,
  Badge,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";

export const StockListItem = () => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />
      <Stack flex={1}>
        <CardBody>
          <Text color={`blackAlpha.600`} fontSize={14}>
            更新日: 2023/07/07 12:00
          </Text>
          <Flex align={`center`} mt={1} mb={2}>
            <Heading size="md">ごみ袋（黄色）</Heading>
            <Badge fontSize="1.2em" colorScheme="red">
              残り 1
            </Badge>
          </Flex>
          <Button colorScheme="blue" size={`md`} minW={`200px`}>
            追加
          </Button>
        </CardBody>

        <CardFooter>
          <Text>
            <Link href={`/`}>扇家のストレージ</Link>
          </Text>
        </CardFooter>
      </Stack>
    </Card>
  );
};
