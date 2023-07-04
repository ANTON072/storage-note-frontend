import { configureStore } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";

import { authReducer } from "@/domain/auth";
import { userReducer } from "@/domain/users";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  preloadedState: load(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
});

export type AppState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
