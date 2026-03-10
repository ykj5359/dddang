import React, { createContext, useContext, useState, useEffect } from 'react';
import { authStorage } from '../utils/authUtils';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = authStorage.getUser();
    if (saved) setUser(saved);
    setLoading(false);
  }, []);

  const login = (userData) => {
    authStorage.setUser(userData);
    setUser(userData);
  };

  const logout = () => {
    authStorage.removeUser();
    setUser(null);
  };

  const updateUser = (updated) => {
    const next = { ...user, ...updated };
    authStorage.setUser(next);
    setUser(next);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
