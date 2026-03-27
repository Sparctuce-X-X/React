const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Toutes les routes sont protégées par JWT
router.use(verifyToken);

// Stockage en mémoire par utilisateur
const tasks = [];

// GET /api/tasks — Récupérer les tâches de l'utilisateur connecté
router.get('/', (req, res) => {
  const userTasks = tasks.filter(t => t.userId === req.user.id);
  res.json(userTasks);
});

// POST /api/tasks — Créer une tâche
router.post('/', (req, res) => {
  const { title, description, priority } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Le titre est obligatoire' });
  }

  const newTask = {
    id: uuidv4(),
    userId: req.user.id,
    title,
    description: description || '',
    priority: priority || 'medium',
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id — Modifier une tâche
router.put('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id && t.userId === req.user.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Tâche introuvable' });
  }

  tasks[index] = { ...tasks[index], ...req.body, id: tasks[index].id, userId: tasks[index].userId };
  res.json(tasks[index]);
});

// DELETE /api/tasks/:id — Supprimer une tâche
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id && t.userId === req.user.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Tâche introuvable' });
  }

  tasks.splice(index, 1);
  res.json({ message: 'Tâche supprimée' });
});

module.exports = router;
