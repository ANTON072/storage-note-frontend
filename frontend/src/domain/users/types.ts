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
  userId: yup
    .string()
    .matches(/^[A-Za-z0-9_]{1,15}$/, "ユーザーIDが不正です")
    .required(),
  notificationEmail: yup.string().email().required(),
  photoURL: yup.string().url(),
});

export type AppUser = yup.InferType<typeof appUserSchema>;

export type UserState = {
  firebase: FirebaseUser | null;
};
