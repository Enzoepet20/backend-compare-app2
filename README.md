# Compare App Backend v2.1.0
API en Express.js con Swagger para servir `products.json` (~600k registros)

## Endpoints principales

- `GET /products` con filtros: type, provincia, localidad, marca, nombre, page, limit
- `GET /products/{id}` para un registro específico
- `GET /search?q=term` búsqueda en nombre, marca, sucursalNombre

## Uso
1. `npm install`
2. Copiar `products.json` en `data/`
3. `npm run dev`
4. Docs y pruebas en `http://localhost:5000/api-docs`
