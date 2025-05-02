const express = require('express');
const { search } = require('../controllers/searchController');
const router = express.Router();

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Buscar por nombre, marca o sucursal
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 *       400:
 *         description: Parámetro faltante
 */
router.get('/', search);
module.exports = router;