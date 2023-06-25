import { nanoid } from "@reduxjs/toolkit";
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { firebaseGetStorage } from ".";

const extractFileNameFromURL = (fileURL: string) => {
  const regex = /[^/]+(?=\?alt=media)/;
  const match = fileURL.match(regex);

  return match ? match[0] : "";
};

const getExtensionFromDataURL = (dataURL: string) => {
  const regex = /^data:(.+);/;
  const match = dataURL.match(regex);

  if (match !== null) {
    const mimeType = match[1];
    switch (mimeType) {
      case "image/jpeg":
        return ".jpg";
      case "image/png":
        return ".png";
      case "image/gif":
        return ".gif";
      default:
        return "";
    }
  } else {
    return "";
  }
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
    const ext = getExtensionFromDataURL(url);
    const name = `user-${nanoid()}${ext}`;
    const storage = firebaseGetStorage();
    const storageRef = ref(storage, name);
    await uploadString(storageRef, url, "data_url");
    return await getDownloadURL(storageRef);
  };

  const deleteImage = async (fileURL: string) => {
    const fileName = extractFileNameFromURL(fileURL);
    const storage = firebaseGetStorage();
    const storageRef = ref(storage, fileName);
    return await deleteObject(storageRef);
  };

  return { uploadImage, deleteImage };
};
