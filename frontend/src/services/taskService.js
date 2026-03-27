import api from './api';

const taskService = {
  // Récupérer toutes les tâches
  async getAll() {
    const response = await api.get('/tasks');
    return response.data;
  },

  // Créer une tâche
  async create(taskData) {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Modifier une tâche
  async update(id, taskData) {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Supprimer une tâche
  async remove(id) {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  // Basculer l'état complété
  async toggleComplete(id, completed) {
    const response = await api.put(`/tasks/${id}`, { completed });
    return response.data;
  },
};

export default taskService;
