import { Image, Center, Icon } from "@chakra-ui/react";
import { BiImage } from "react-icons/bi";

type Props = {
  imageUrl?: string;
};

export const Thumbnail = ({ imageUrl }: Props) => {
  if (!imageUrl) {
    return (
      <Center w={`100px`} h={`100px`} bg={`gray.200`} rounded={`md`}>
        <Icon as={BiImage} boxSize={8} color={`gray.400`} />
      </Center>
    );
  }

  return (
    <Image
      src={imageUrl}
      objectFit="cover"
      w={`100px`}
      h={`100px`}
      rounded={`md`}
    />
  );
};
