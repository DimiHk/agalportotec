import axios from "axios";
import { getCookie } from "cookies-next";

const COOKIE_NAME = process.env.NEXT_PUBLIC_AUTHENTICATION_COOKIE_NAME!;

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const cookie = getCookie(COOKIE_NAME)?.valueOf();
  if (cookie) config.headers.Authorization = `Bearer ${cookie}`;
  return config;
});
