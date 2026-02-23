const Auditorio = require('../models/Auditorio');

const obtenerAuditorios = async (req, res) => {
  try {
    const auditorios = await Auditorio.find().sort({ createdAt: -1 });
    res.json(auditorios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener auditorios' });
  }
};

const obtenerAuditorioPorId = async (req, res) => {
  try {
    const auditorio = await Auditorio.findById(req.params.id);
    if (!auditorio) {
      return res.status(404).json({ mensaje: 'Auditorio no encontrado' });
    }
    res.json(auditorio);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener auditorio' });
  }
};

const crearAuditorio = async (req, res) => {
  try {
    const auditorio = await Auditorio.create(req.body);
    res.status(201).json({
      mensaje: 'Auditorio creado correctamente',
      exito: true,
      data: auditorio
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear auditorio',
      exito: false
    });
  }
};

const actualizarAuditorio = async (req, res) => {
  try {
    const auditorio = await Auditorio.findById(req.params.id);
    if (!auditorio) {
      return res.status(404).json({
        mensaje: 'Auditorio no encontrado',
        exito: false
      });
    }

    const auditorioActualizado = await Auditorio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      mensaje: 'Auditorio actualizado correctamente',
      exito: true,
      data: auditorioActualizado
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar auditorio',
      exito: false
    });
  }
};

const eliminarAuditorio = async (req, res) => {
  try {
    const auditorio = await Auditorio.findById(req.params.id);
    if (!auditorio) {
      return res.status(404).json({
        mensaje: 'Auditorio no encontrado',
        exito: false
      });
    }

    await Auditorio.findByIdAndDelete(req.params.id);
    res.json({
      mensaje: 'Auditorio eliminado correctamente',
      exito: true
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar auditorio',
      exito: false
    });
  }
};

module.exports = {
  obtenerAuditorios,
  obtenerAuditorioPorId,
  crearAuditorio,
  actualizarAuditorio,
  eliminarAuditorio
};