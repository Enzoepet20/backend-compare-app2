# Compare App Backend v2.2.0

An **Express.js** backend serving a large dataset (`products.json`) with advanced filtering, pagination,
search functionality, caching, and fully documented Swagger UI.

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/compare-app-backend.git
   cd compare-app-backend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env to set DATA_PATH and other variables
   ```
4. **Place your dataset**
   - Copy `products.json` into `data/` folder or update `DATA_PATH` in `.env`
5. **Run in development**
   ```bash
   npm run dev
   ```
6. **Access the API**
   - Swagger UI: http://localhost:5000/api-docs
   - Products endpoint: http://localhost:5000/products
   - Search endpoint: http://localhost:5000/search?q=term

## 📁 Project Structure
```
compare-app-backend/
├── data/
│   └── products.json       # Large JSON dataset
├── src/
│   ├── controllers/
│   │   ├── productController.js
│   │   └── searchController.js
│   ├── middleware/
│   │   ├── cache.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── searchRoutes.js
│   ├── swagger.js         # Swagger setup
│   └── index.js           # App entry point
├── .env.example
├── package.json
├── README.md
└── LICENSE
```

## 🎯 Features
- **Paginated & Filtered**: `/products` supports query params: `type`, `provincia`, `localidad`, `marca`, `nombre`, `page`, `limit`.
- **Detailed Record**: `/products/{id}` fetches a single branch or product by its ID.
- **Search**: `/search?q=term` searches across `nombre`, `marca`, and `sucursalNombre` with top 100 results.
- **Caching**: In-memory caching (TTL configurable) reduces load on repeated requests.
- **Performance**: Uses `compression`, `helmet`, and loads dataset once on startup.
- **Swagger UI**: Explore and test endpoints at `/api-docs` with full parameter/docs and example responses.

## 🔧 Configuration via `.env`
| Variable   | Default             | Description                            |
|------------|---------------------|----------------------------------------|
| PORT       | 5000                | HTTP port for server                   |
| DATA_PATH  | ./data/products.json| Path to the JSON dataset               |
| CACHE_TTL  | 300                 | Cache time-to-live in seconds          |

---