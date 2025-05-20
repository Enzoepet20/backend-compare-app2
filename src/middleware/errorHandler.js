// src/middleware/errorHandler.js
/**
 * @module middleware/errorHandler
 */

/**
 * Maneja rutas no definidas (404).
 *
 * @param {object} req - Objeto de petición HTTP (Express)
 * @param {object} res - Objeto de respuesta HTTP (Express)
 * @returns {void}
 */
const notFound = (req, res) =>
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });

/**
 * Manejador genérico de errores.
 *
 * @param {Error} err - Objeto Error
 * @param {object} req - Objeto de petición HTTP (Express)
 * @param {object} res - Objeto de respuesta HTTP (Express)
 * @param {Function} next - Función siguiente middleware
 * @returns {void}
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
};

module.exports = { notFound, errorHandler };
