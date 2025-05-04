const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Compare App Backend API',
      version: '2.2.0',
      description: 'API to query branches and products with advanced filters, pagination, search, and caching.'
    },
    servers: [ { url: `http://localhost:${process.env.PORT || 5000}` } ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = { swaggerUi, swaggerSpec };