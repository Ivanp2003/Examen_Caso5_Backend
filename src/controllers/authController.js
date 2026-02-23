const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Generar JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        mensaje: 'Por favor ingrese email y password'
      });
    }

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        token: null,
        nombre: null,
        apellido: null,
        email: null,
        mensaje: 'Usuario o contraseña incorrectos.'
      });
    }

    const passwordCorrecto = await usuario.compararPassword(password);

    if (!passwordCorrecto) {
      return res.status(401).json({
        token: null,
        nombre: null,
        apellido: null,
        email: null,
        mensaje: 'Usuario o contraseña incorrectos.'
      });
    }

    const token = generarToken(usuario._id);

    res.json({
      token,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      mensaje: 'Login exitoso'
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      mensaje: 'Error en el servidor'
    });
  }
};

// Registro
const registro = async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    const usuarioExiste = await Usuario.findOne({ email });

    if (usuarioExiste) {
      return res.status(400).json({
        mensaje: 'El usuario ya existe'
      });
    }

    const usuario = await Usuario.create({
      nombre,
      apellido,
      email,
      password
    });

    const token = generarToken(usuario._id);

    res.status(201).json({
      token,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      mensaje: 'Usuario registrado exitosamente'
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      mensaje: 'Error en el servidor'
    });
  }
};

module.exports = { login, registro };