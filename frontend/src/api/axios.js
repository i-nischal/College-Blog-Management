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
    // Only redirect on 401 if it's NOT the initial auth check
  
    const isAuthCheckRequest = error.config?.url?.includes('/auth/me');
    
    if (error.response?.status === 401 && !isAuthCheckRequest) {
      // Clear any remaining localStorage data
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;