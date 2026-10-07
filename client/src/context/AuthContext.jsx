import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, getCurrentUser, updateUserProfile } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("betteracco_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("betteracco_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      const storedToken = localStorage.getItem("betteracco_token");
      if (storedToken) {
        try {
          const freshUser = await getCurrentUser();
          if (freshUser) {
            setUser(freshUser);
            localStorage.setItem("betteracco_user", JSON.stringify(freshUser));
          }
        } catch {
          // Token might be invalid or expired; keep local data or clear if needed
        }
      }
      setLoading(false);
    }
    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    if (res.data?.user) {
      setUser(res.data.user);
      setToken(res.data.token);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await registerUser(userData);
    if (res.data?.user) {
      setUser(res.data.user);
      setToken(res.data.token);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem("betteracco_token");
    localStorage.removeItem("betteracco_user");
    setUser(null);
    setToken(null);
  };

  const updateProfile = async (data) => {
    const res = await updateUserProfile(data);
    if (res.data) {
      setUser(res.data);
      localStorage.setItem("betteracco_user", JSON.stringify(res.data));
    }
    return res;
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user && token),
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
