import { createAsyncThunk } from '@reduxjs/toolkit'
import { instAxios } from '../../utils/axios';

type TRegisterProps = {
  username: string,
  password: string,
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password }: TRegisterProps) => {
    const response = await instAxios.post('/auth/register', {
      username,
      password,
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    if (response.data.token) {
      window.localStorage.setItem('token', response.data.token);
    }

    return response.data;
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: TRegisterProps) => {
    const response = await instAxios.post('/auth/login', {
      username,
      password,
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    if (response.data.token) {
      window.localStorage.setItem('token', response.data.token);
    }

    return response.data;
  }
)

export const getMe = createAsyncThunk(
  'auth/getMe',
  async () => {
    const response = await instAxios.get('/auth/me');

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  }
)