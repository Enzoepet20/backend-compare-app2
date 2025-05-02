const notFound = (req, res, next) => {
    res.status(404);
    res.json({ message: `Ruta ${req.originalUrl} no encontrada` });
  };
  const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error del servidor', error: err.message });
  };
  module.exports = { notFound, errorHandler };
  