const express = require('express');
const router = express.Router();
const {
  obtenerReservas,
  obtenerReservaPorId,
  crearReserva,
  actualizarReserva,
  eliminarReserva
} = require('../controllers/reservaController');
const { protegerRuta } = require('../middlewares/authMiddleware');

// Todas las rutas protegidas
router.use(protegerRuta);

router.route('/')
  .get(obtenerReservas)
  .post(crearReserva);

router.route('/:id')
  .get(obtenerReservaPorId)
  .put(actualizarReserva)
  .delete(eliminarReserva);

module.exports = router;
