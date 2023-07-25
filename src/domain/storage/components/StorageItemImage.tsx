import { Image, Icon, Text, Center, VStack } from "@chakra-ui/react";
import { FiFolder } from "react-icons/fi";

type Props = {
  imageUrl?: string;
};

export const StorageItemImage = ({ imageUrl }: Props) => {
  if (imageUrl) {
    return (
      <Image
        objectFit="cover"
        src={imageUrl}
        alt=""
        w={`100px`}
        h={`100px`}
        rounded={`md`}
      />
    );
  }

  return (
    <Center w={`100px`} h={`100px`} bg={`gray.200`} rounded={`md`}>
      <VStack>
        <Icon as={FiFolder} boxSize={8} color={`gray.400`} />
        <Text fontSize={12} color={`gray.400`}>
          NO IMAGE
        </Text>
      </VStack>
    </Center>
  );
};
