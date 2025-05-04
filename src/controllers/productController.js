const fs = require('fs');
const path = require('path');
const _ = require('lodash');
let products = [];
// Load data on startup
(() => {
  const filePath = path.join(__dirname, '../data/products.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  products = JSON.parse(raw);
  console.log(`Loaded ${products.length} records from products.json`);
})();

// @desc Get paginated, filtered products or branches
// @route GET /products
// @query page, limit, type, provincia, localidad, marca, nombre
const getProducts = (req, res) => {
  let data = products;
  // Filter by type
  const { type, provincia, localidad, marca, nombre } = req.query;
  if (type === 'sucursal') data = data.filter(p => p.sucursalNombre);
  if (type === 'producto') data = data.filter(p => p.marca);
  // Additional filters
  if (provincia) data = data.filter(p => p.provincia === provincia);
  if (localidad) data = data.filter(p => p.localidad && p.localidad.toLowerCase() === localidad.toLowerCase());
  if (marca) data = data.filter(p => p.marca && p.marca.toLowerCase() === marca.toLowerCase());
  if (nombre) data = data.filter(p => p.nombre && p.nombre.toLowerCase().includes(nombre.toLowerCase()));

  // Pagination
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 100);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = _.slice(data, start, end);

  res.json({ page, limit, total: data.length, data: paginated });
};

// @desc Get record by ID
// @route GET /products/:id
const getById = (req, res) => {
  const { id } = req.params;
  const record = products.find(p => p.id === id || p.producto_id === id || p.sucursalId === id);
  if (!record) return res.status(404).json({ message: 'Record not found' });
  res.json(record);
};

module.exports = { getProducts, getById, products };
