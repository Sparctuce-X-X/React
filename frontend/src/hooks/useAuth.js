import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

/** Message lisible pour les erreurs Axios (réseau, API, etc.) */
function getAuthErrorMessage(err, fallback) {
  const fromApi = err.response?.data?.error || err.response?.data?.message;
  if (fromApi) return fromApi;
  if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
    return "Impossible de joindre l'API. Vérifie que le backend tourne (dans le dossier backend : npm run dev) sur le port 5001.";
  }
  return fallback;
}

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
      setError(getAuthErrorMessage(err, 'Erreur de connexion'));
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
      setError(getAuthErrorMessage(err, "Erreur lors de l'inscription"));
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
