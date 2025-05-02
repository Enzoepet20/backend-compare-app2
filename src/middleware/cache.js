const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutos
module.exports = (req, res, next) => {
  const key = req.originalUrl;
  const cached = cache.get(key);
  if (cached) return res.json(cached);
  res.originalJson = res.json;
  res.json = (body) => {
    cache.set(key, body);
    res.originalJson(body);
  };
  next();
};