import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});

// Add token before request
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user?.backendToken) {
    config.headers.Authorization = `Bearer ${session.user.backendToken}`;
  }
  return config;
});

export default api;
