import { nanoid } from "@reduxjs/toolkit";

const getExtensionFromMimeType = (mimeType: string) => {
  const mapping: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
  };

  return mapping[mimeType] || "";
};

const dataURLtoBlob = (dataURL: string) => {
  // データURIをBASE64データとMIME識別子に分割
  const splitDataURI = dataURL.split(",");
  const byteString = atob(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  // バイト配列を作成
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }

  // Blobを作成
  const blob = new Blob([int8Array], { type: mimeString });
  return blob;
};

const dataURLtoFile = (dataURL: string, filename: string) => {
  const blob = dataURLtoBlob(dataURL);
  const ext = getExtensionFromMimeType(blob.type);
  const file = new File([blob], `${filename}${ext}`, { type: blob.type });
  return file;
};

type UploadImageToStorageArgs = {
  url: string;
};

export const useFirebaseStorage = () => {
  const uploadImage = async ({ url }: UploadImageToStorageArgs) => {
    // 空文字もしくはURLの場合は即終了
    if (!url || /^http.+/.test(url)) {
      return Promise.resolve(url);
    }
    const file = dataURLtoFile(url, `user-${nanoid()}`);
    console.log("file", file);
  };

  return { uploadImage };
};
