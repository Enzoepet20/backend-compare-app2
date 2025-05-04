const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300, checkperiod: 600 });
module.exports = (req, res, next) => {
  const key = req.originalUrl;
  const cached = cache.get(key);
  if (cached) return res.json(cached);
  const original = res.json;
  res.json = (body) => {
    cache.set(key, body);
    original.call(res, body);
  };
  next();
};
