/**
 * 404 Not Found handler
 */
const notFound = (req, res) => res.status(404).json({ message: `Route ${req.originalUrl} not found` });

/**
 * Generic error handler
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
};

module.exports = { notFound, errorHandler };
