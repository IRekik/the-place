// context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  pseudo?: string;
  username?: string;
  admin?: boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (rawUser && token) {
        setUser(JSON.parse(rawUser));
      }
    } catch (err) {
      console.error("Failed to load user from localStorage", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User, token: string) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      console.error("Failed to save user to localStorage", err);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (err) {
      console.warn("localStorage clear failed", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};