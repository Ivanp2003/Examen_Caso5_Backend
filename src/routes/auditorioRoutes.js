const express = require('express');
const router = express.Router();
const {
  obtenerAuditorios,
  obtenerAuditorioPorId,
  crearAuditorio,
  actualizarAuditorio,
  eliminarAuditorio
} = require('../controllers/auditorioController');
const { protegerRuta } = require('../middlewares/authMiddleware');

// Todas las rutas protegidas
router.use(protegerRuta);

router.route('/')
  .get(obtenerAuditorios)
  .post(crearAuditorio);

router.route('/:id')
  .get(obtenerAuditorioPorId)
  .put(actualizarAuditorio)
  .delete(eliminarAuditorio);

module.exports = router;