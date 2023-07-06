import { configureStore } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";

import { authReducer } from "@/domain/auth";
import { userReducer } from "@/domain/users";

import { commonReducer } from "./commonReducer";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    user: userReducer,
  },
  preloadedState: load(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      save({
        states: ["auth", "user"],
      })
    ),
});

export type AppState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
