import api from "./axios";

export const authAPI = {
  // Register new user (supports FormData for avatar upload)
  register: async (userData) => {
    const config = {};

 
    if (userData instanceof FormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    const response = await api.post("/auth/register", userData, config);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  // Logout user (clears cookie on backend)
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // Update user profile (supports FormData for avatar upload)
  updateProfile: async (profileData) => {
    const config = {};

  
    if (profileData instanceof FormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    const response = await api.put("/auth/profile", profileData, config);
    return response.data;
  },
};