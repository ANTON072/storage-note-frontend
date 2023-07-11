import { useEffect } from "react";

import { SmallCloseIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  IconButton,
  AvatarBadge,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";

import { useImageEditor } from "@/domain/application";

import type { AppUser } from "../types";
import type { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<AppUser>;
};

export const UserAvatar = ({ form }: Props) => {
  const photoUrl = form.watch("photoUrl");

  const errors = form.formState.errors;

  const { ImageEditor, imageFileInputRef, croppedDataURL, isLoading } =
    useImageEditor({
      maxSizePx: 128 * 2,
    });

  useEffect(() => {
    if (croppedDataURL) {
      form.setValue("photoUrl", croppedDataURL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedDataURL]);

  return (
    <>
      <Avatar src={photoUrl} size="2xl" key={photoUrl}>
        <AvatarBadge
          as={IconButton}
          size="md"
          rounded="full"
          top="-10px"
          colorScheme={photoUrl ? `red` : `blue`}
          aria-label={photoUrl ? `アイコンを削除` : `アイコンを追加`}
          icon={photoUrl ? <SmallCloseIcon /> : <SmallAddIcon />}
          isLoading={isLoading}
          onClick={() => {
            if (photoUrl) {
              // 削除
              form.setValue("photoUrl", "");
            } else {
              imageFileInputRef.current?.click();
            }
          }}
          onError={(error) => {
            console.log(error);
          }}
        />
      </Avatar>
      <FormControl isInvalid={!!errors.photoUrl}>
        <FormErrorMessage justifyContent={`center`}>
          {errors.photoUrl?.message}
        </FormErrorMessage>
      </FormControl>
      <ImageEditor />
    </>
  );
};
