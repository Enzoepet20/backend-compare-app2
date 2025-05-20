// src/swagger.js
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

/** 
 * Carga la especificación Swagger generada en docs/backend/swagger.json
 * y configura el UI.
 * @module swagger
 */
const swaggerPath = path.join(__dirname, '../docs/backend/swagger.json');
const swaggerSpec = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));

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
      defaultModelsExpandDepth: -1,
      docExpansion: 'none',
      displayRequestDuration: true,
      showExtensions: true
    }
  }
};
