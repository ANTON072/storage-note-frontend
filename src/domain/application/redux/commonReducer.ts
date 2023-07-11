import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { FirebaseError } from "firebase/app";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface CommonSliceState {
  error: {
    title?: string;
    message: string;
  } | null;
}

const initialState: CommonSliceState = {
  error: null,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<unknown | null>) => {
      const error = action.payload;
      if (error === null) {
        state.error = null;
      } else if (error instanceof AxiosError) {
        const errorObj = error.response?.data.errors[0];
        if (errorObj) {
          state.error = {
            title: errorObj.title,
            message: errorObj.description,
          };
        }
      } else if (error instanceof FirebaseError) {
        state.error = {
          title: error.name,
          message: error.message,
        };
      } else {
        state.error = {
          message: "予期しないエラーが発生しました",
        };
      }
    },
  },
});

export const { setError } = commonSlice.actions;

export const commonReducer = commonSlice.reducer;
