import api from './api';

const authService = {
  // Inscription
  async register(name, email, password) {
    const response = await api.post('/auth/register', { name, email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
  },

  // Connexion
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
  },

  // Déconnexion
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Récupérer l'utilisateur courant depuis le localStorage
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
};

export default authService;
