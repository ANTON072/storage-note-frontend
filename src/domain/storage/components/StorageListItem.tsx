import {
  Card,
  CardBody,
  Stack,
  Image,
  Avatar,
  CardFooter,
  Heading,
  AvatarGroup,
} from "@chakra-ui/react";

// type Props = {
//   imageUrl?: string;
//   storageName: string;
// };

export const StorageListItem: React.FC = () => {
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

      <Stack>
        <CardBody>
          <Heading size="md">扇家のストレージ</Heading>
        </CardBody>

        <CardFooter>
          <AvatarGroup size="md" max={2}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          </AvatarGroup>
        </CardFooter>
      </Stack>
    </Card>
  );
};
