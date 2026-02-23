# Backend - Sistema de Gestión de Conferencias

API REST desarrollada con Node.js + Express + MongoDB Atlas.

## Tecnologías
- Node.js
- Express
- MongoDB Atlas
- JWT para autenticación
- bcryptjs para encriptación

## Endpoints

### Autenticación
- POST `/api/auth/login` - Iniciar sesión
- POST `/api/auth/registro` - Registrar usuario

## Variables de Entorno
```
PORT=5000
MONGODB_URI=tu_connection_string
JWT_SECRET=tu_secreto
JWT_EXPIRE=24h
```

## Instalación Local
```bash
npm install
npm run dev
```

## Usuario de Prueba
- Email: admin@sistema.com
- Password: admin123
```