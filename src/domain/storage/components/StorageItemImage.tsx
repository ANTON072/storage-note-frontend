import { Box, Image, Icon, Text, Center, VStack } from "@chakra-ui/react";
import { FiFolder } from "react-icons/fi";

type Props = {
  imageUrl?: string;
};

export const StorageItemImage = ({ imageUrl }: Props) => {
  if (imageUrl) {
    return (
      <Image objectFit="cover" src={imageUrl} alt="" w={`100%`} h={`100%`} />
    );
  }

  return (
    <Center w={`100%`} h={`100%`} bg={`gray.200`}>
      <VStack>
        <Icon as={FiFolder} boxSize={8} color={`gray.400`} />
        <Text fontSize={12} color={`gray.400`}>
          NO IMAGE
        </Text>
      </VStack>
    </Center>
  );
};
