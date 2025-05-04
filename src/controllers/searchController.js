const { products } = require('./productController');

// @desc Search by query in nombre, marca or sucursalNombre
// @route GET /search?q=term
const search = (req, res) => {
  const term = req.query.q;
  if (!term) return res.status(400).json({ message: 'Missing query parameter q' });
  const lower = term.toLowerCase();
  const result = products.filter(p => 
    (p.nombre && p.nombre.toLowerCase().includes(lower)) ||
    (p.marca && p.marca.toLowerCase().includes(lower)) ||
    (p.sucursalNombre && p.sucursalNombre.toLowerCase().includes(lower))
  ).slice(0, 100);
  res.json({ query: term, results: result, count: result.length });
};

module.exports = { search };