import { useEffect } from "react";

import { SmallCloseIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Avatar, IconButton, AvatarBadge } from "@chakra-ui/react";

import { useImageEditor } from "@/domain/application";

import type { AppUser } from "../types";
import type { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<AppUser>;
};

export const UserAvatar = ({ form }: Props) => {
  const photoURL = form.watch("photoURL");

  const { ImageEditor, imageFileInputRef, croppedDataURL, isLoading } =
    useImageEditor({
      maxSizePx: 128 * 2,
    });

  useEffect(() => {
    if (croppedDataURL) {
      form.setValue("photoURL", croppedDataURL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedDataURL]);

  return (
    <>
      <Avatar src={photoURL} size="2xl" key={photoURL}>
        <AvatarBadge
          as={IconButton}
          size="md"
          rounded="full"
          top="-10px"
          colorScheme={photoURL ? `red` : `blue`}
          aria-label={photoURL ? `アイコンを削除` : `アイコンを追加`}
          icon={photoURL ? <SmallCloseIcon /> : <SmallAddIcon />}
          isLoading={isLoading}
          onClick={() => {
            if (photoURL) {
              // 削除
              form.setValue("photoURL", "");
            } else {
              imageFileInputRef.current?.click();
            }
          }}
          onError={(error) => {
            console.log(error);
          }}
        />
      </Avatar>
      <ImageEditor />
    </>
  );
};
