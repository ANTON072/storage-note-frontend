import * as yup from "yup";

import { appUserSchema } from "@/domain/users";

import type { StorageMemberResponse } from "../users/types";

export const storageSchema = yup.object({
  name: yup
    .string()
    .min(5, "5文字以上で入力してください")
    .max(20, "20文字以内で入力してください")
    .required(),
  description: yup.string().max(140, "140文字以内で入力してください"),
  members: yup.array().of(appUserSchema).required(),
  imageUrl: yup.string(),
});

export type StorageFormValues = yup.InferType<typeof storageSchema>;

export type StorageRequest = Omit<StorageFormValues, "members"> & {
  members: string[];
};

export type StorageResponse = Omit<StorageFormValues, "members"> & {
  id: string;
  members: StorageMemberResponse[];
};
