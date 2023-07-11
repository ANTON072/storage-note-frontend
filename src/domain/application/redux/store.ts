import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/domain/auth";
import { userReducer } from "@/domain/users";

import { commonReducer } from "./commonReducer";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
