import axios from "axios";
import { toast } from "react-toastify";

export const instAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instAxios.interceptors.request.use(
  (config) => {
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    const token = window.localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
  },
  (error) => {
    console.error(error);
    toast.error(error.message, { theme: "colored" });
    return Promise.reject(error);
  }
);
