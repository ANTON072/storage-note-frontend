import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type UserMeta = {
  createdAt: User["metadata"]["creationTime"];
  lastLoginAt: User["metadata"]["lastSignInTime"];
};

type FirebaseUser = {
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

export interface UserState {
  firebase: FirebaseUser | null;
}

const initialState: UserState = {
  firebase: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFirebaseUser: (state, action: PayloadAction<FirebaseUser | null>) => {
      state.firebase = action.payload;
    },
  },
});

export const { setFirebaseUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
