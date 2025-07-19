import axios from "axios";

// 개발 환경에서는 프록시 사용, 프로덕션에서는 실제 URL 사용
const baseURL = import.meta.env.DEV
  ? "" // 개발 환경에서는 프록시 사용
  : import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }
  return config;
});
