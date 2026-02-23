const express = require('express');
const router = express.Router();
const {
  obtenerConferencistas,
  obtenerConferencistaPorId,
  crearConferencista,
  actualizarConferencista,
  eliminarConferencista
} = require('../controllers/conferencistaController');
const { protegerRuta } = require('../middlewares/authMiddleware');

// Todas las rutas protegidas
router.use(protegerRuta);

router.route('/')
  .get(obtenerConferencistas)
  .post(crearConferencista);

router.route('/:id')
  .get(obtenerConferencistaPorId)
  .put(actualizarConferencista)
  .delete(eliminarConferencista);

module.exports = router;