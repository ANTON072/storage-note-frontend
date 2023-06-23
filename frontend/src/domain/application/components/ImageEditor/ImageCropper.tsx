import { useCallback, useState } from "react";

import { Box } from "@chakra-ui/react";
import Cropper from "react-easy-crop";

import type { Area } from "react-easy-crop";

type Props = {
  dataURL: string;
  aspect?: number;
  onChangeCrop: (croppedArea: Area, croppedAreaPixels: Area) => void;
};

export const ImageCropper = ({ dataURL, aspect = 1, onChangeCrop }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <Box position={`relative`} pt={`calc(3/4*100%)`}>
      <Cropper
        image={dataURL}
        aspect={aspect}
        zoom={zoom}
        onCropComplete={onChangeCrop}
        crop={crop}
        onCropChange={setCrop}
        onZoomChange={setZoom}
      />
    </Box>
  );
};
