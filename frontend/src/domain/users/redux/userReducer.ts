import { createSlice } from "@reduxjs/toolkit";

import type { AppUser, FirebaseUser, UserState } from "../types";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  firebase: null,
  appUser: {
    userId: "",
    notificationEmail: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFirebaseUser: (state, action: PayloadAction<FirebaseUser | null>) => {
      state.firebase = action.payload;
    },
    setAppUser: (state, action: PayloadAction<AppUser>) => {
      state.appUser = action.payload;
    },
  },
});

export const { setFirebaseUser, setAppUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
