import { Tag, Avatar, TagLabel, TagCloseButton } from "@chakra-ui/react";

type Props = {
  userId: string;
  userImage?: string;
  onClose: () => void;
};

export const UserIdTag = ({ userId, userImage, onClose }: Props) => {
  return (
    <Tag size="lg" colorScheme="blue" borderRadius="full">
      <Avatar src={userImage} size="xs" ml={-1} mr={2} />
      <TagLabel>{userId}</TagLabel>
      <TagCloseButton onClick={onClose} />
    </Tag>
  );
};
