import { SmallCloseIcon } from "@chakra-ui/icons";
import { Box, Image as CImage, IconButton } from "@chakra-ui/react";

import type { ImageProps } from "@chakra-ui/react";

type Props = ImageProps & {
  onClose: () => void;
};

export const Image = ({ onClose, ...rest }: Props) => {
  return (
    <Box position={`relative`}>
      <CImage {...rest} />
      <IconButton
        rounded={`100%`}
        aria-label="画像を削除"
        icon={<SmallCloseIcon />}
        size={`sm`}
        colorScheme="red"
        position={`absolute`}
        top={2}
        right={2}
        onClick={onClose}
      />
    </Box>
  );
};
