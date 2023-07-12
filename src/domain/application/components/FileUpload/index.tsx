import { useEffect, useState } from "react";

import { SmallAddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

import { useImageEditor } from "@/domain/application";

import { Image } from "./Image";

export const FileUpload = () => {
  const { ImageEditor, imageFileInputRef, croppedDataURL, isLoading } =
    useImageEditor({
      maxSizePx: 300 * 2,
    });

  const [tmpImage, setTmpImage] = useState("");

  useEffect(() => {
    if (croppedDataURL) {
      setTmpImage(croppedDataURL);
    }
  }, [croppedDataURL]);

  return (
    <>
      {tmpImage ? (
        <Image
          w={`100%`}
          src={tmpImage}
          onClose={() => {
            setTmpImage("");
          }}
        />
      ) : (
        <Button
          leftIcon={<SmallAddIcon />}
          width={`100%`}
          onClick={() => {
            imageFileInputRef.current?.click();
          }}
        >
          画像を選択
        </Button>
      )}

      <ImageEditor />
    </>
  );
};
