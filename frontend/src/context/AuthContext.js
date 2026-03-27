import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

// Création du contexte d'authentification
export const AuthContext = createContext(null);

// Provider qui encapsule toute l'application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restaurer la session au démarrage de l'app
  useEffect(() => {
    const savedUser = authService.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { user: loggedUser } = await authService.login(email, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const register = async (name, email, password) => {
    const { user: newUser } = await authService.register(name, email, password);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook utilitaire pour consommer le contexte
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext doit être utilisé dans un AuthProvider');
  }
  return context;
};
