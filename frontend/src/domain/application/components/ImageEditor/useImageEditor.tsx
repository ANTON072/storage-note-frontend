import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalHeader,
} from "@chakra-ui/react";

import { ImageCropper } from "./ImageCropper";
import { cropImage, resizeImage } from "./lib";

import type { Area } from "react-easy-crop";

type ImageEditorArgs = {
  maxSizePx: number;
};

export const useImageEditor = ({ maxSizePx }: ImageEditorArgs) => {
  // オリジナルFileデータ
  const [orgFile, setOrgFile] = useState<File | null>(null);
  const [orgDataURL, setOrgDataURL] = useState("");
  // 加工後のDataURL
  const [croppedDataURL, setCroppedDataURL] = useState<string | undefined>();

  const [isLoading, setLoading] = useState(false);

  const imageFileInputRef = useRef<HTMLInputElement>(null);

  const convertFileToDataURL = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onloadstart = () => {
        setLoading(true);
      };

      fileReader.onloadend = () => {
        setLoading(false);
        if (typeof fileReader.result === "string") {
          const dataURL = fileReader.result;
          resolve(dataURL);
        } else {
          reject("dataURLの変換に失敗しました");
        }
      };

      fileReader.readAsDataURL(file);
    });
  };

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];
      setOrgFile(file);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setOrgFile(null);
  }, []);

  // FileをDataURLへ変換
  useEffect(() => {
    const convertAndSetDataURL = async () => {
      if (orgFile) {
        const dataURL = await convertFileToDataURL(orgFile);
        setOrgDataURL(dataURL);
      } else {
        setOrgDataURL("");
      }
    };
    convertAndSetDataURL();
  }, [orgFile]);

  const ImageEditor = useMemo(() => {
    const ImageFileInputComponent: React.FC = () => {
      // クロップ位置
      const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

      const handleCropImage = useCallback(async () => {
        if (!croppedAreaPixels || !orgFile) return;
        setLoading(true);
        // 切り抜き
        const croppedDataURLImage = await cropImage({
          src: orgDataURL,
          croppedAreaPixels,
        });
        // リサイズ
        const resizedDataURLImage = await resizeImage({
          src: croppedDataURLImage,
          maxSizePx,
          mineType: orgFile.type,
        });
        setLoading(false);
        setCroppedDataURL(resizedDataURLImage);
        handleCloseModal();
      }, [croppedAreaPixels]);

      return (
        <>
          <input
            hidden
            type="file"
            ref={imageFileInputRef}
            accept=".jpg,.png"
            onChange={handleChange}
          />
          <Modal
            isOpen={!!orgDataURL}
            onClose={handleCloseModal}
            size={`3xl`}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader />
              <ModalCloseButton />
              <ModalBody>
                <ImageCropper
                  dataURL={orgDataURL}
                  onChangeCrop={(_, croppedAreaPixels) => {
                    setCroppedAreaPixels(croppedAreaPixels);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={handleCropImage}
                  colorScheme="blue"
                  isLoading={isLoading}
                >
                  適用
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      );
    };

    return ImageFileInputComponent;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgDataURL]);

  return { imageFileInputRef, ImageEditor, croppedDataURL, isLoading };
};
