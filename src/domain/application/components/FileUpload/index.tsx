import { useEffect } from "react";

import { SmallAddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

import { useImageEditor } from "@/domain/application";

import { Image } from "./Image";

type Props = {
  imageValue: string;
  setImageValue: (value: string) => void;
};

export const FileUpload = ({ imageValue, setImageValue }: Props) => {
  const { ImageEditor, imageFileInputRef, croppedDataURL, isLoading } =
    useImageEditor({
      maxSizePx: 300 * 2,
    });

  useEffect(() => {
    if (croppedDataURL) {
      setImageValue(croppedDataURL);
    }
  }, [croppedDataURL, setImageValue]);

  return (
    <>
      {imageValue ? (
        <Image
          w={`100%`}
          src={imageValue}
          onClose={() => {
            setImageValue("");
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
