const Reserva = require('../models/Reserva');

const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate('auditorio', 'nombre ubicacion capacidad')
      .populate('conferencista', 'nombre apellido cedula email')
      .sort({ createdAt: -1 });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reservas' });
  }
};

const obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id)
      .populate('auditorio', 'nombre ubicacion capacidad')
      .populate('conferencista', 'nombre apellido cedula email');
    
    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reserva' });
  }
};

const crearReserva = async (req, res) => {
  try {
    const reserva = await Reserva.create(req.body);
    const reservaCompleta = await Reserva.findById(reserva._id)
      .populate('auditorio', 'nombre ubicacion capacidad')
      .populate('conferencista', 'nombre apellido cedula email');

    res.status(201).json({
      mensaje: 'Reserva creada correctamente',
      exito: true,
      data: reservaCompleta
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear reserva',
      exito: false
    });
  }
};

const actualizarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) {
      return res.status(404).json({
        mensaje: 'Reserva no encontrada',
        exito: false
      });
    }

    const reservaActualizada = await Reserva.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('auditorio', 'nombre ubicacion capacidad')
      .populate('conferencista', 'nombre apellido cedula email');

    res.json({
      mensaje: 'Reserva actualizada correctamente',
      exito: true,
      data: reservaActualizada
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar reserva',
      exito: false
    });
  }
};

const eliminarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) {
      return res.status(404).json({
        mensaje: 'Reserva no encontrada',
        exito: false
      });
    }

    await Reserva.findByIdAndDelete(req.params.id);
    res.json({
      mensaje: 'Reserva eliminada correctamente',
      exito: true
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar reserva',
      exito: false
    });
  }
};

module.exports = {
  obtenerReservas,
  obtenerReservaPorId,
  crearReserva,
  actualizarReserva,
  eliminarReserva
};
