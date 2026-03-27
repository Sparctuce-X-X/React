import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import useTasks from '../hooks/useTasks';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuthContext();
  const { tasks, stats, loading } = useTasks();
  const [greeting, setGreeting] = useState('');

  // useEffect pour calculer le message de salutation selon l'heure
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bonjour');
    else if (hour < 18) setGreeting('Bon après-midi');
    else setGreeting('Bonsoir');
  }, []);

  // Tâches récentes (les 3 dernières)
  const recentTasks = tasks.slice(0, 3);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{greeting}, {user?.name} 👋</h1>
        <p className="dashboard-date">
          {new Date().toLocaleDateString('fr-FR', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          })}
        </p>
      </div>

      {/* Cartes statistiques */}
      <div className="stats-grid">
        <div className="stat-card total">
          <span className="stat-icon">📋</span>
          <div>
            <p className="stat-label">Total</p>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>
        <div className="stat-card completed">
          <span className="stat-icon">✅</span>
          <div>
            <p className="stat-label">Terminées</p>
            <p className="stat-value">{stats.completed}</p>
          </div>
        </div>
        <div className="stat-card pending">
          <span className="stat-icon">⏳</span>
          <div>
            <p className="stat-label">En cours</p>
            <p className="stat-value">{stats.pending}</p>
          </div>
        </div>
        <div className="stat-card progress">
          <span className="stat-icon">📈</span>
          <div>
            <p className="stat-label">Progression</p>
            <p className="stat-value">
              {stats.total > 0
                ? `${Math.round((stats.completed / stats.total) * 100)}%`
                : '0%'}
            </p>
          </div>
        </div>
      </div>

      {/* Barre de progression */}
      {stats.total > 0 && (
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${(stats.completed / stats.total) * 100}%` }}
          />
        </div>
      )}

      {/* Tâches récentes */}
      <div className="recent-section">
        <div className="recent-header">
          <h2>Tâches récentes</h2>
          <Link to="/tasks" className="view-all">Voir tout →</Link>
        </div>

        {loading ? (
          <p className="loading-text">Chargement...</p>
        ) : recentTasks.length === 0 ? (
          <div className="empty-state">
            <p>Aucune tâche pour l'instant.</p>
            <Link to="/tasks" className="btn-cta">+ Créer ma première tâche</Link>
          </div>
        ) : (
          <ul className="recent-list">
            {recentTasks.map((task) => (
              <li key={task.id} className={`recent-item ${task.completed ? 'done' : ''}`}>
                <span className="recent-status">{task.completed ? '✅' : '⭕'}</span>
                <span className="recent-title">{task.title}</span>
                <span className={`badge priority-${task.priority}`}>{task.priority}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
