const fs = require('fs');
const path = require('path');
let products = [];
// Cargar datos al iniciar
(() => {
  const dataPath = path.join(__dirname, '../data/products.json');
  const raw = fs.readFileSync(dataPath, 'utf-8');
  products = JSON.parse(raw);
  console.log(`Cargados ${products.length} registros`);
})();

// @desc    Get paginated products
// @route   GET /products
// @query   page, limit, type (sucursal|producto)
const getProducts = (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 100);
  const start = (page - 1) * limit;
  const end = start + limit;
  const type = req.query.type;
  let data = products;
  if (type === 'sucursal') data = data.filter(p => p.sucursalNombre);
  else if (type === 'producto') data = data.filter(p => p.marca);
  const paginated = data.slice(start, end);
  res.json({ page, limit, total: data.length, data: paginated });
};

// @desc    Get record by ID
// @route   GET /products/:id
const getById = (req, res) => {
  const id = req.params.id;
  const record = products.find(p => p.id === id || p.producto_id === id);
  if (!record) return res.status(404).json({ message: 'No encontrado' });
  res.json(record);
};
module.exports = { getProducts, getById };