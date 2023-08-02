import { IconButton } from "@chakra-ui/react";
import { BsStarFill } from "react-icons/bs";

type Props = {
  isFavorite: boolean;
  onToggle: () => void;
};

export const FavoriteButton = ({ isFavorite, onToggle }: Props) => {
  return (
    <IconButton
      size={`xs`}
      color={isFavorite ? `yellow.500` : `gray.500`}
      aria-label="お気に入りに追加"
      rounded={`full`}
      icon={<BsStarFill />}
      onClick={onToggle}
    />
  );
};
