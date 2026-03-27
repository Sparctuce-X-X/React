import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';
import useForm from '../hooks/useForm';
import TaskCard from '../components/TaskCard/TaskCard';
import './Tasks.css';

const FILTERS = ['all', 'pending', 'completed'];
const PRIORITIES = ['low', 'medium', 'high'];

const Tasks = () => {
  const { tasks, loading, error, createTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const { values, handleChange, reset } = useForm({
    title: '',
    description: '',
    priority: 'medium',
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!values.title.trim()) return;
    await createTask(values);
    reset();
    setShowForm(false);
  };

  // Filtrage des tâches
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h1>Mes tâches</h1>
        <button onClick={() => setShowForm((v) => !v)} className="btn-new-task">
          {showForm ? '✕ Annuler' : '+ Nouvelle tâche'}
        </button>
      </div>

      {/* Formulaire de création */}
      {showForm && (
        <form onSubmit={handleCreate} className="task-form">
          <h3>Nouvelle tâche</h3>
          <div className="form-row">
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Titre de la tâche *"
              required
              autoFocus
            />
            <select name="priority" value={values.priority} onChange={handleChange}>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p === 'high' ? '🔴 Haute' : p === 'medium' ? '🟡 Moyenne' : '🟢 Basse'}
                </option>
              ))}
            </select>
          </div>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Description (optionnel)"
            rows={2}
          />
          <button type="submit" className="btn-create">Créer la tâche</button>
        </form>
      )}

      {error && <div className="alert-error">{error}</div>}

      {/* Filtres */}
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
          >
            {f === 'all' ? 'Toutes' : f === 'completed' ? 'Terminées' : 'En cours'}
            <span className="filter-count">
              {f === 'all'
                ? tasks.length
                : f === 'completed'
                ? tasks.filter((t) => t.completed).length
                : tasks.filter((t) => !t.completed).length}
            </span>
          </button>
        ))}
      </div>

      {/* Liste des tâches */}
      {loading ? (
        <p className="loading-text">Chargement des tâches...</p>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-tasks">
          <p>Aucune tâche {filter !== 'all' ? 'dans cette catégorie' : ''}.</p>
        </div>
      ) : (
        <div className="tasks-list">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
