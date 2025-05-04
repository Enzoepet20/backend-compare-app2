const express = require('express');
const { getProducts, getById } = require('../controllers/productController');
const cache = require('../middleware/cache');
const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get paginated & filtered records
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: ["sucursal", "producto"]
 *         description: Filter by record type
 *       - in: query
 *         name: provincia
 *         schema: { type: string }
 *         description: Province code
 *       - in: query
 *         name: localidad
 *         schema: { type: string }
 *         description: Locality name (case-insensitive)
 *       - in: query
 *         name: marca
 *         schema: { type: string }
 *         description: Product brand (case-insensitive)
 *       - in: query
 *         name: nombre
 *         schema: { type: string }
 *         description: Partial product name search
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 100 }
 *     responses:
 *       200:
 *         description: Paginated & filtered data
 */
router.get('/', cache, getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Record ID (branch or product)
 *     responses:
 *       200: { description: Record object }
 *       404: { description: Not found }
 */
router.get('/:id', cache, getById);

module.exports = router;