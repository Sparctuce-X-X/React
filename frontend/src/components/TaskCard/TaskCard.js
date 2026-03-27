import React, { useState } from 'react';
import './TaskCard.css';

const PRIORITY_LABELS = { high: '🔴 Haute', medium: '🟡 Moyenne', low: '🟢 Basse' };

// Composant réutilisable pour afficher une tâche
const TaskCard = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(task.id, { title: editTitle.trim(), description: editDesc.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDesc(task.description);
    setIsEditing(false);
  };

  return (
    <div className={`task-card priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, task.completed)}
          className="task-checkbox"
        />

        {isEditing ? (
          <input
            className="task-edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <h3 className="task-title">{task.title}</h3>
        )}

        <span className="task-priority">{PRIORITY_LABELS[task.priority]}</span>
      </div>

      {isEditing ? (
        <textarea
          className="task-edit-textarea"
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          placeholder="Description..."
          rows={2}
        />
      ) : (
        task.description && <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <span className="task-date">
          {new Date(task.createdAt).toLocaleDateString('fr-FR')}
        </span>
        <div className="task-actions">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn btn-save">Sauvegarder</button>
              <button onClick={handleCancel} className="btn btn-cancel">Annuler</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="btn btn-edit">✏️ Modifier</button>
              <button onClick={() => onDelete(task.id)} className="btn btn-delete">🗑️ Supprimer</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
