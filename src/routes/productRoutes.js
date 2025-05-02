const express = require('express');
const { getProducts, getById } = require('../controllers/productController');
const cache = require('../middleware/cache');
const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener productos o sucursales paginados
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: ["sucursal", "producto"]
 *         description: Filtrar por tipo de registro
 *     responses:
 *       200:
 *         description: Lista paginada
 */
router.get('/', cache, getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener registro por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro
 *       404:
 *         description: No encontrado
 */
router.get('/:id', cache, getById);
module.exports = router;
