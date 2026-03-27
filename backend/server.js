const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5001;

// CORS : en dev, autorise localhost / 127.0.0.1 sur n'importe quel port (CRA peut prendre 3002 si 3000 est pris)
const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    const fixed = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
    ];
    if (fixed.includes(origin)) return callback(null, true);
    const isLocalDev =
      process.env.NODE_ENV !== 'production' &&
      /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
    if (isLocalDev) return callback(null, true);
    callback(new Error(`Origine non autorisée par CORS: ${origin}`));
  },
};

// Middleware globaux
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API v1.0' });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route introuvable' });
});

const server = app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `\n❌ Le port ${PORT} est déjà utilisé (autre terminal / ancien nodemon).\n` +
        `   • Arrête l’autre serveur avec Ctrl+C, ou libère le port :\n` +
        `     lsof -nP -iTCP:${PORT} | grep LISTEN\n` +
        `     kill <PID>\n` +
        `   • Ou utilise un autre port : PORT=5002 npm run dev\n`
    );
    process.exit(1);
  }
  throw err;
});
