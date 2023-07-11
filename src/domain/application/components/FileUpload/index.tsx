import { SmallAddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

import { Image } from "./Image";

export const FileUpload = () => {
  return (
    <>
      <Image
        onClose={() => {
          //
        }}
      />
      <Button leftIcon={<SmallAddIcon />} width={`100%`}>
        画像を選択
      </Button>
    </>
  );
};
