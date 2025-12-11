import axios from "axios";
import { BASE_URL } from "./index";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      const res = await api.post("/admin/refresh", { refreshToken });

      const newToken = res.data.accessToken;

      localStorage.setItem("adminToken", newToken);

      api.defaults.headers.common["Authorization"] = "Bearer " + newToken;

      return api(original);
    }

    return Promise.reject(err);
  }
);

export default api;
