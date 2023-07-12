import * as yup from "yup";

import { appUserSchema } from "@/domain/users";

export const storageSchema = yup.object({
  name: yup
    .string()
    .min(5, "5文字以上で入力してください")
    .max(20, "20文字以内で入力してください")
    .required(),
  members: yup.array().of(appUserSchema),
  imageUrl: yup.string(),
});

export type Storage = yup.InferType<typeof storageSchema>;
