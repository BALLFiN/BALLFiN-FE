import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://44.207.10.254', // vite config 수정하고 변경예정
});

axiosInstance.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_ACCESS_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
