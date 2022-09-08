import { configureStore, Middleware } from '@reduxjs/toolkit';
import { authReducer } from '../slices/authSlice/authSlice';
import { postReducer } from '../slices/postSlice/postSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
