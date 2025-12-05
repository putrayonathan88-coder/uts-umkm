import axios from "axios";   

export const BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
