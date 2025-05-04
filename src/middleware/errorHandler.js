const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
};
module.exports = { notFound, errorHandler };

// src/routes/productRoutes.js
const express = require('express');
const { getProducts, getById } = require('../controllers/productController');
const cache = require('../middleware/cache');
const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get paginated products or branches
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Items per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: ["sucursal", "producto"]
 *         description: Filter by record type
 *       - in: query
 *         name: provincia
 *         schema:
 *           type: string
 *         description: Province code
 *       - in: query
 *         name: localidad
 *         schema:
 *           type: string
 *         description: Locality name
 *       - in: query
 *         name: marca
 *         schema:
 *           type: string
 *         description: Product brand
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Partial match on product name
 *     responses:
 *       200:
 *         description: Paginated and filtered list of records
 */
router.get('/', cache, getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a record by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID (sucursal or producto)
 *     responses:
 *       200:
 *         description: Record found
 *       404:
 *         description: Record not found
 */
router.get('/:id', cache, getById);
module.exports = router;
