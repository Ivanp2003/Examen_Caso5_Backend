require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const conferencistaRoutes = require('./routes/conferencistaRoutes');
const auditorioRoutes = require('./routes/auditorioRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

// Conectar a MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Sistema de Gestión de Conferencias',
    version: '1.0.0',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        registro: 'POST /api/auth/registro'
      },
      conferencistas: {
        listar: 'GET /api/conferencistas',
        crear: 'POST /api/conferencistas',
        obtener: 'GET /api/conferencistas/:id',
        actualizar: 'PUT /api/conferencistas/:id',
        eliminar: 'DELETE /api/conferencistas/:id'
      },
      auditorios: {
        listar: 'GET /api/auditorios',
        crear: 'POST /api/auditorios',
        obtener: 'GET /api/auditorios/:id',
        actualizar: 'PUT /api/auditorios/:id',
        eliminar: 'DELETE /api/auditorios/:id'
      },
      reservas: {
        listar: 'GET /api/reservas',
        crear: 'POST /api/reservas',
        obtener: 'GET /api/reservas/:id',
        actualizar: 'PUT /api/reservas/:id',
        eliminar: 'DELETE /api/reservas/:id'
      }
    }
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/conferencistas', conferencistaRoutes);
app.use('/api/auditorios', auditorioRoutes);
app.use('/api/reservas', reservaRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    mensaje: 'Ruta no encontrada'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    mensaje: 'Error en el servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
});