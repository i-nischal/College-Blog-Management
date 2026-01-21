import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state by checking with backend (cookie will be sent automatically)
  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log("Checking authentication status...");
        // Try to get current user from backend
        // The cookie is sent automatically with this request
        const response = await authAPI.getProfile();
        console.log("User authenticated:", response.data);
        setUser(response.data);
      } catch (error) {
        // No valid session - user not authenticated
        // This is expected for logged-out users, so just set user to null
        console.log("No active session - user not authenticated", error.response?.status);
        setUser(null);
      } finally {
        console.log("Auth check complete");
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Login function
  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const userData = response.data;

      // Cookie is set by backend automatically
      // Just update the user state
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const user = response.data;

      // Cookie is set by backend automatically
      // Just update the user state
      setUser(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call backend logout endpoint to clear cookie
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear user state
      setUser(null);
    }
  };

  // Update user profile
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};