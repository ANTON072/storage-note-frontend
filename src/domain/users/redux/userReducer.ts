import { createSlice } from "@reduxjs/toolkit";

import type { AppUser, FirebaseUser } from "../types";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  firebase: FirebaseUser | null;
  appUser: AppUser | null;
};

const initialState: UserState = {
  firebase: null,
  appUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFirebaseUser: (state, action: PayloadAction<FirebaseUser | null>) => {
      state.firebase = action.payload;
    },
    setAppUser: (state, action: PayloadAction<AppUser | null>) => {
      state.appUser = action.payload;
    },
  },
});

export const { setFirebaseUser, setAppUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
