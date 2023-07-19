import { useState } from "react";

import { FileUpload } from "./index";

export const useFileUpload = () => {
  const [imageValue, setImageValue] = useState("");

  const FileUploadComponent = () => {
    return <FileUpload imageValue={imageValue} setImageValue={setImageValue} />;
  };

  return {
    FileUpload: FileUploadComponent,
    imageValue,
    setImageValue,
  };
};
