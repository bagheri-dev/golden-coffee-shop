import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "./urls";

export const client = axios.create({
  baseURL: "https://final-project-server-czdkp9d41-mahdis-projects-864a6f70.vercel.app/",
  timeout: 1000,
});

client.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = Cookies.get("refresh_token");
      if (refreshToken) {
        try {
          const { data } = await client.post(urls.token, {
            refreshToken,
          });

          if (data?.accessToken) {
            Cookies.set("access_token", data.accessToken, { secure: true, sameSite: "Strict" });
            error.config.headers.Authorization = `Bearer ${data.accessToken}`;
            return client(error.config);
          }
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          window.location.href = "/login";
        }
      } else {
        console.error("No refresh token available");
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
