require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');

// Conectar a MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    mensaje: '🎤 API Sistema de Gestión de Conferencias - ESFTEC',
    version: '1.0.0',
    endpoints: {
      login: 'POST /api/auth/login',
      registro: 'POST /api/auth/registro'
    }
  });
});

// Rutas
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
});