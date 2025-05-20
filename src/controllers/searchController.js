// src/controllers/searchController.js
const { products } = require('./productController');

/**
 * @module controllers/searchController
 */

/**
 * Busca en nombre, marca o sucursalNombre y devuelve hasta 100 resultados.
 *
 * @name GET /search
 * @memberof module:controllers/searchController
 * @function search
 * @param {object} req - Objeto de petición HTTP (Express)
 * @param {object} res - Objeto de respuesta HTTP (Express)
 * @returns {void}
 *
 * @query {string} q - Término de búsqueda
 */
const search = (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Missing query parameter q' });

  const term = q.toLowerCase();
  const results = products.filter(p =>
    p.nombre?.toLowerCase().includes(term) ||
    p.marca?.toLowerCase().includes(term) ||
    p.sucursalNombre?.toLowerCase().includes(term)
  ).slice(0, 100);

  return res.json({ query: q, count: results.length, results });
};

module.exports = { search };
