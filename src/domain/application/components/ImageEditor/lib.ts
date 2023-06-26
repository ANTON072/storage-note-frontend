import Pica from "pica";

import type { Area } from "react-easy-crop";

type CropImageArgs = {
  src: string;
  croppedAreaPixels: Area;
};

type ResizeImageArgs = {
  src: string;
  maxSizePx: number;
  mineType: string;
};

export const createImage = (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });
};

/** 画像を切り抜く */
export const cropImage = async ({ src, croppedAreaPixels }: CropImageArgs) => {
  try {
    const image = await createImage(src);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Unable to get canvas context");
    }

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const data = ctx.getImageData(
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.putImageData(data, 0, 0);

    return canvas.toDataURL();
  } catch (error) {
    console.error(error);
    throw error; // this will allow calling function to handle the error
  }
};

export const resizeImage = async ({
  src,
  maxSizePx,
  mineType,
}: ResizeImageArgs) => {
  const pica = Pica();
  const image = await createImage(src);
  const canvas = document.createElement("canvas");

  const nw = image.naturalWidth;
  const nh = image.naturalHeight;

  if (nh > nw && nh > maxSizePx) {
    // 縦長の場合
    canvas.height = maxSizePx;
    canvas.width = maxSizePx * (nw / nh);
  } else if (nw > nh && nw > maxSizePx) {
    // 横長の場合
    canvas.width = maxSizePx;
    canvas.height = maxSizePx * (nh / nw);
  } else if (nw === nh && nw > maxSizePx) {
    // 正方形の場合
    canvas.width = maxSizePx;
    canvas.height = maxSizePx;
  } else {
    // 小さい画像の場合
    canvas.width = nw;
    canvas.height = nh;
  }

  return pica.resize(image, canvas).then(() => canvas.toDataURL(mineType));
};
