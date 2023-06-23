import { SmallCloseIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Avatar, IconButton, AvatarBadge } from "@chakra-ui/react";

import { useImageEditor } from "@/domain/application";

import type { AppUser } from "../types";

type Props = {
  photoURL: AppUser["photoURL"];
};

export const UserAvatar = ({ photoURL }: Props) => {
  const { ImageEditor, imageFileInputRef, croppedDataURL } = useImageEditor({
    maxSizePx: 128 * 2,
  });

  console.log("croppedDataURL", croppedDataURL);

  return (
    <>
      <Avatar src={photoURL} size="2xl">
        <AvatarBadge
          as={IconButton}
          size="md"
          rounded="full"
          top="-10px"
          colorScheme={photoURL ? `red` : `blue`}
          aria-label={photoURL ? `アイコンを削除` : `アイコンを追加`}
          icon={photoURL ? <SmallCloseIcon /> : <SmallAddIcon />}
          onClick={() => {
            if (photoURL) {
              // 削除
            } else {
              imageFileInputRef.current?.click();
            }
          }}
        />
      </Avatar>
      <ImageEditor />
    </>
  );
};
