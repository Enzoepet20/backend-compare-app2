// src/controllers/productController.js
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

/**
 * @module controllers/productController
 */

/**
 * In-memory store for product aaaand branch records.
 * @type {Array<Object>}
 */
let products = [];

/** 
 * Carga inicial de datos desde JSON.
 * @private
 */
(function loadData() {
  const dataPath = process.env.DATA_PATH || path.join(__dirname, '../data/products.json');
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    products = JSON.parse(raw);
    console.log(`✅ Loaded ${products.length} records from ${dataPath}`);
  } catch (err) {
    console.error(`❌ Failed to load data from ${dataPath}:`, err);
    process.exit(1);
  }
})();

/**
 * Obtiene productos o sucursales, con paginación y filtros.
 *
 * @name GET /products
 * @memberof module:controllers/productController
 * @function getProducts
 * @param {object} req - Objeto de petición HTTP (Express)
 * @param {object} res - Objeto de respuesta HTTP (Express)
 * @returns {void}
 *
 * @query {string} [type] - 'sucursal' o 'producto'
 * @query {string} [provincia]
 * @query {string} [localidad]
 * @query {string} [marca]
 * @query {string} [nombre]
 * @query {number} [page=1]
 * @query {number} [limit=100]
 */
const getProducts = (req, res) => {
  let data = products;
  const { type, provincia, localidad, marca, nombre } = req.query;

  if (type === 'sucursal') data = data.filter(p => p.sucursalNombre);
  if (type === 'producto') data = data.filter(p => p.marca);
  if (provincia) data = data.filter(p => p.provincia === provincia);
  if (localidad) data = data.filter(p => p.localidad?.toLowerCase() === localidad.toLowerCase());
  if (marca) data = data.filter(p => p.marca?.toLowerCase() === marca.toLowerCase());
  if (nombre) data = data.filter(p => p.nombre?.toLowerCase().includes(nombre.toLowerCase()));

  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, parseInt(req.query.limit, 10) || 100);
  const start = (page - 1) * limit;
  const slice = _.slice(data, start, start + limit);

  return res.json({ page, limit, total: data.length, data: slice });
};

/**
 * Obtiene un producto o sucursal por su ID.
 *
 * @name GET /products/:id
 * @memberof module:controllers/productController
 * @function getById
 * @param {object} req - Objeto de petición HTTP (Express)
 * @param {object} res - Objeto de respuesta HTTP (Express)
 * @returns {void}
 *
 * @param {string} req.params.id - ID del registro (id, producto_id o sucursalId)
 */
const getById = (req, res) => {
  const { id } = req.params;
  const record = products.find(
    p => p.id === id || p.producto_id === id || p.sucursalId === id
  );
  if (!record) return res.status(404).json({ message: 'Record not found' });
  return res.json(record);
};

module.exports = { getProducts, getById, products };
