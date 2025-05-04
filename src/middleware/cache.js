const NodeCache = require('node-cache');
const ttl = parseInt(process.env.CACHE_TTL, 10) || 300;
const cache = new NodeCache({ stdTTL: ttl, checkperiod: ttl * 2 });

/**
 * Route caching middleware
 */
module.exports = (req, res, next) => {
  const key = req.originalUrl;
  const cached = cache.get(key);
  if (cached) return res.json(cached);
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    cache.set(key, body);
    originalJson(body);
  };
  next();
};
