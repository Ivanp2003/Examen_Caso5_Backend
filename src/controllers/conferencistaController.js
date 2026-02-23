const Conferencista = require('../models/Conferencista');

// Obtener todos
const obtenerConferencistas = async (req, res) => {
  try {
    const conferencistas = await Conferencista.find().sort({ createdAt: -1 });
    res.json(conferencistas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener conferencistas' });
  }
};

// Obtener por ID
const obtenerConferencistaPorId = async (req, res) => {
  try {
    const conferencista = await Conferencista.findById(req.params.id);
    if (!conferencista) {
      return res.status(404).json({ mensaje: 'Conferencista no encontrado' });
    }
    res.json(conferencista);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener conferencista' });
  }
};

// Crear
const crearConferencista = async (req, res) => {
  try {
    const { cedula } = req.body;
    const existe = await Conferencista.findOne({ cedula });
    
    if (existe) {
      return res.status(400).json({
        mensaje: 'Ya existe un conferencista con esa cédula',
        exito: false
      });
    }

    const conferencista = await Conferencista.create(req.body);
    res.status(201).json({
      mensaje: 'Conferencista creado correctamente',
      exito: true,
      data: conferencista
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear conferencista',
      exito: false
    });
  }
};

// Actualizar
const actualizarConferencista = async (req, res) => {
  try {
    const conferencista = await Conferencista.findById(req.params.id);
    if (!conferencista) {
      return res.status(404).json({
        mensaje: 'Conferencista no encontrado',
        exito: false
      });
    }

    const conferencistaActualizado = await Conferencista.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      mensaje: 'Conferencista actualizado correctamente',
      exito: true,
      data: conferencistaActualizado
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar conferencista',
      exito: false
    });
  }
};

// Eliminar
const eliminarConferencista = async (req, res) => {
  try {
    const conferencista = await Conferencista.findById(req.params.id);
    if (!conferencista) {
      return res.status(404).json({
        mensaje: 'Conferencista no encontrado',
        exito: false
      });
    }

    await Conferencista.findByIdAndDelete(req.params.id);
    res.json({
      mensaje: 'Conferencista eliminado correctamente',
      exito: true
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar conferencista',
      exito: false
    });
  }
};

module.exports = {
  obtenerConferencistas,
  obtenerConferencistaPorId,
  crearConferencista,
  actualizarConferencista,
  eliminarConferencista
};