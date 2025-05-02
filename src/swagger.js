const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Compare App Backend API',
      version: '2.0.0',
      description: 'API para consultar sucursales y productos con filtros y paginación'
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 5000}` }]
  },
  apis: ['./src/routes/*.js']
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = { swaggerUi, swaggerSpec };
