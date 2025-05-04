const express = require('express');
const { search } = require('../controllers/searchController');
const cache = require('../middleware/cache');
const router = express.Router();

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search records by term in name, brand, or branch
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string }
 *         description: Search term
 *     responses:
 *       200: { description: Search results }
 *       400: { description: Missing query parameter }
 */
router.get('/', cache, search);

module.exports = router;
