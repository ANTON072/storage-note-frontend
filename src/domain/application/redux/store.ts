import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/domain/auth";
import { userReducer } from "@/domain/users";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
