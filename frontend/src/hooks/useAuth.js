import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

// Custom hook pour les formulaires d'authentification
const useAuth = () => {
  const { login, register, logout, user, isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const loggedUser = await login(email, password);
      return loggedUser;
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de connexion');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await register(name, email, password);
      return newUser;
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'inscription");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    handleLogin,
    handleRegister,
    logout,
    clearError,
  };
};

export default useAuth;
