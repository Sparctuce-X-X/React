import { useState, useEffect, useCallback } from 'react';
import taskService from '../services/taskService';

// Custom hook pour gérer les tâches (CRUD + état)
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les tâches au montage du composant
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors du chargement des tâches');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Créer une nouvelle tâche
  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la création');
      throw err;
    }
  };

  // Modifier une tâche existante
  const updateTask = async (id, taskData) => {
    try {
      const updated = await taskService.update(id, taskData);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      return updated;
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la modification');
      throw err;
    }
  };

  // Supprimer une tâche
  const deleteTask = async (id) => {
    try {
      await taskService.remove(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la suppression');
      throw err;
    }
  };

  // Basculer completed
  const toggleTask = async (id, completed) => {
    try {
      const updated = await taskService.toggleComplete(id, !completed);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur');
      throw err;
    }
  };

  // Stats calculées
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  return {
    tasks,
    loading,
    error,
    stats,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
};

export default useTasks;
