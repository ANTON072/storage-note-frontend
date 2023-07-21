import * as yup from "yup";

import type { User } from "firebase/auth";

export type UserMeta = {
  createdAt: User["metadata"]["creationTime"];
  lastLoginAt: User["metadata"]["lastSignInTime"];
};

export type FirebaseUser = {
  displayName: User["displayName"];
  email: User["email"];
  emailVerified: User["emailVerified"];
  metadata: UserMeta;
  photoURL: User["photoURL"];
  providerData: User["providerData"];
  providerId: User["providerId"];
  refreshToken: User["refreshToken"];
  tenantId: User["tenantId"];
  uid: User["uid"];
};

export const appUserSchema = yup.object({
  name: yup
    .string()
    .matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,15}$/, "ユーザーIDの形式が不正です")
    .required(),
  photoUrl: yup.string(),
});

export type AppUser = yup.InferType<typeof appUserSchema>;

export type StorageMemberResponse = AppUser & { isOwner: boolean };
