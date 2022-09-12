import axios from 'axios';

export const instAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
  }
});
