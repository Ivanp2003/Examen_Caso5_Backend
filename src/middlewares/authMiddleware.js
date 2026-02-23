const jwt = require('jsonwebtoken');

const protegerRuta = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        mensaje: 'No autorizado, token inválido'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      mensaje: 'No autorizado, no hay token'
    });
  }
};

module.exports = { protegerRuta };