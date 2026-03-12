import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:5000/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthCheckRequest = error.config?.url?.includes("/auth/me");
    const isAuthRoute =
      error.config?.url?.includes("/auth/login") ||
      error.config?.url?.includes("/auth/register");

    if (error.response?.status === 401 && !isAuthCheckRequest && !isAuthRoute) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
