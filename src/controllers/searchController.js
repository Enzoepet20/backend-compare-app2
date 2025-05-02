const products = require('../controllers/productController').products;

// @desc    Search by query in nombre or marca or sucursalNombre
// @route   GET /search?q=term
const search = (req, res) => {
  const term = req.query.q?.toLowerCase();
  if (!term) return res.status(400).json({ message: 'Falta parámetro q' });
  const result = products.filter(p => 
    (p.nombre && p.nombre.toLowerCase().includes(term)) ||
    (p.marca && p.marca.toLowerCase().includes(term)) ||
    (p.sucursalNombre && p.sucursalNombre.toLowerCase().includes(term))
  ).slice(0, 100);
  res.json({ query: term, results: result });
};
module.exports = { search };