import axios from 'axios';

/* type TInstance = {
  baseURL: string,
  headers: {
    [key: string]: string
  }
} */

export const instAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
  }
});

/* instance.interceptors.request.use((config: TInstance): TInstance => {
  config.headers.Authorization = window.localStorage.getItem('token') as string;
  return config;
}) */