import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  idToken: string;
}

const initialState: AuthState = {
  idToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIdToken: (state, action: PayloadAction<string>) => {
      state.idToken = action.payload;
    },
  },
});

export const { setIdToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
