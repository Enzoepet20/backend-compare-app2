const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Compare App Backend API',
      version: '2.2.0',
      description: `📖 **Compare App** API documentation. Explore endpoints for branches and products with advanced filters, pagination, search, and caching.

**Usage Tips:**
- Use the \`type\` parameter to distinguish between branches (\`sucursal\`) and products (\`producto\`).
- Include examples in your queries to see sample responses.
- Contact API support team at support@compareapp.com for more details.`
    },
    servers: [ { url: `http://localhost:${process.env.PORT || 5000}` } ]
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

// Custom CSS to tweak Swagger UI
const customCss = `
  .swagger-ui .topbar { background-color: #4a90e2; }
  .swagger-ui .info .title { font-size: 2em; }
  .swagger-ui .info .description { white-space: pre-wrap; }
  .swagger-ui .parameter__default, .swagger-ui .prop__default { visibility: hidden; }
`;

module.exports = {
  swaggerUi,
  swaggerSpec,
  swaggerUiOptions: {
    explorer: true,
    customCss,
    swaggerOptions: {
      defaultModelsExpandDepth: -1, // hide schemas section
      docExpansion: 'none',         // collapse endpoints
      displayRequestDuration: true, // show request duration
      showExtensions: true,
    }
  }
};