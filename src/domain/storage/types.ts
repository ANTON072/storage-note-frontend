import * as yup from "yup";

import { appUserSchema } from "@/domain/users";

export const storageSchema = yup.object({
  name: yup.string().min(5).max(20).required(),
  members: yup.array().of(appUserSchema),
  imageUrl: yup.string(),
});

export type Storage = yup.InferType<typeof storageSchema>;
