// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { swaggerUi, swaggerSpec } = require('./swagger');
const productRoutes = require('./routes/productRoutes');
const searchRoutes = require('./routes/searchRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

/**
 * Punto de entrada de la aplicación.
 * @module index
 */

const app = express();

// Middlewares generales
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// Rutas de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/products', productRoutes);
app.use('/search', searchRoutes);

// Handlers de errores
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
