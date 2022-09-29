import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TRootState } from '../../store';
import {IAuthState, IDataRegister, IDataLogin, IUser} from './interfaces';
import { registerUser, loginUser, getMe } from './asyncFunc'
import { AxiosError } from 'axios';

const initialState: IAuthState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: IAuthState) => {
      state.error = null;
      state.isLoading = false;
      state.status = null;
      state.token = null;
      state.user = null;
    },
    resetAuthStatus: (state: IAuthState) => {
      state.status = null;
    },
    setTheUser: (state: IAuthState, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    }
  },
  extraReducers: {
    //Register
    [registerUser.pending.type]: (state: IAuthState) => {
      state.isLoading = true;
      state.status = null;
      state.error = null;
    },
    [registerUser.fulfilled.type]: (state: IAuthState, action: PayloadAction<IDataRegister>) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.token = action.payload.token;
      state.user = action.payload.newUser;
    },
    [registerUser.rejected.type]: (state: IAuthState, action: any) => {
      state.status = action.error.message;
      state.isLoading = false;
      state.error = action.error
    },
    // login
    [loginUser.pending.type]: (state: IAuthState) => {
      state.isLoading = true;
      state.status = null;
      state.error = null;
    },
    [loginUser.fulfilled.type]: (state: IAuthState, action: PayloadAction<IDataLogin>) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [loginUser.rejected.type]: (state: IAuthState, action: any) => {
      state.status = action.error.message;
      state.isLoading = false;
      state.error = action.error
    },
    // Проверка авторизации
    [getMe.pending.type]: (state: IAuthState) => {
      state.isLoading = true;
      state.status = null;
      state.error = null;
    },
    [getMe.fulfilled.type]: (state: IAuthState, action: PayloadAction<IDataLogin>) => {
      state.isLoading = false;
      state.status = null;
      state.token = action.payload?.token;
      state.user = action.payload?.user;
    },
    [getMe.rejected.type]: (state: IAuthState, action: any) => {
      state.status = action.error.message;
      state.isLoading = false;
      state.error = action.error
    }
  }
});

export const userSelector = (state: TRootState) => state.auth.user;
export const checkAuth = (state: TRootState) => Boolean(state.auth.token);
export const isLoadingSelector = (state: TRootState) => state.auth.isLoading;
export const statusSelector = (state: TRootState) => state.auth.status;
export const isAdminSelector = (state: TRootState) => state.auth.user?.isAdmin;
export const errorSelector = (state: TRootState) => state.auth.error;
export const { logout, resetAuthStatus, setTheUser } = authSlice.actions;
export const authReducer = authSlice.reducer;