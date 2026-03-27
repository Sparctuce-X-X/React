# Task Manager — TP React + Node.js API

## Lancer le projet

### Terminal 1 — Backend API
```bash
cd backend
npm install
npm run dev     # http://localhost:5000
```

### Terminal 2 — Frontend React
```bash
cd frontend
npm install
npm start       # http://localhost:3000
```

---

## Structure du projet

```
React/
├── backend/
│   ├── middleware/
│   │   └── auth.js          ← Middleware JWT (verifyToken)
│   ├── routes/
│   │   ├── auth.js          ← POST /login, POST /register, GET /me
│   │   └── tasks.js         ← CRUD tâches (routes protégées)
│   └── server.js            ← Serveur Express
│
└── frontend/src/
    ├── context/
    │   └── AuthContext.js   ← Contexte React + Provider
    ├── hooks/
    │   ├── useAuth.js       ← Custom hook authentification
    │   ├── useTasks.js      ← Custom hook CRUD tâches
    │   └── useForm.js       ← Custom hook formulaires
    ├── services/
    │   ├── api.js           ← Axios instance + intercepteurs JWT
    │   ├── authService.js   ← Appels API auth
    │   └── taskService.js   ← Appels API tâches
    ├── components/
    │   ├── Layout/          ← Structure globale (Navbar + footer)
    │   ├── Navbar/          ← Navigation avec état auth
    │   ├── TaskCard/        ← Composant tâche réutilisable
    │   └── PrivateRoute/    ← Garde de route JWT
    └── pages/
        ├── Login.js         ← Page connexion
        ├── Register.js      ← Page inscription
        ├── Dashboard.js     ← Tableau de bord avec stats
        └── Tasks.js         ← Gestion complète des tâches
```

## Endpoints API

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| POST | /api/auth/register | ❌ | Créer un compte |
| POST | /api/auth/login | ❌ | Se connecter |
| GET | /api/auth/me | ✅ JWT | Profil utilisateur |
| GET | /api/tasks | ✅ JWT | Liste des tâches |
| POST | /api/tasks | ✅ JWT | Créer une tâche |
| PUT | /api/tasks/:id | ✅ JWT | Modifier une tâche |
| DELETE | /api/tasks/:id | ✅ JWT | Supprimer une tâche |
