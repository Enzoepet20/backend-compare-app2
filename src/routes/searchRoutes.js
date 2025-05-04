const express = require('express');
const { search } = require('../controllers/searchController');
const cache = require('../middleware/cache');
const router = express.Router();

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for records by query term
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Term to search in name, brand or branch
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Missing query parameter
 */
router.get('/', cache, search);
module.exports = router;
