const mongoose = require('mongoose');

const auditorioSchema = new mongoose.Schema({
  cedula: {
    type: String,
    trim: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  ubicacion: {
    type: String,
    trim: true
  },
  capacidad: {
    type: Number,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Auditorio', auditorioSchema);