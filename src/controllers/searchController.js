const { products } = require('./productController');

/**
 * @desc Search records by term in nombre, marca, or sucursalNombre
 * @route GET /search?q=term
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
