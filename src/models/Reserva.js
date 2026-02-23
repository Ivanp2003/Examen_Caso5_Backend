const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: [true, 'El código es requerido']
  },
  descripcion: {
    type: String,
    trim: true
  },
  auditorio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auditorio',
    required: [true, 'El auditorio es requerido']
  },
  conferencista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conferencista',
    required: [true, 'El conferencista es requerido']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reserva', reservaSchema);