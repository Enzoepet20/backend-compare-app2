const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Compare App Backend API',
      version: '2.2.0',
      description: '📖 **Compare App** API docs generated from JSDoc comments.'
    }
  },
  apis: ['./src/controllers/*.js', './src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);
fs.writeFileSync(path.join(__dirname, '../docs/backend/swagger.json'), JSON.stringify(swaggerSpec, null, 2));
console.log('✅ Generated Swagger JSON at docs/backend/swagger.json');
