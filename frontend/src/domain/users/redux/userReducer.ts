import { createSlice } from "@reduxjs/toolkit";

import type { FirebaseUser, UserState } from "../types";
import type { PayloadAction } from "@reduxjs/toolkit";

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
