import NodeCache from "node-cache";

export const cache = new NodeCache({
  stdTTL: 600,
  checkperiod: 120,
});

export const setCache = (cacheKey, value) => {
  cache.set(cacheKey, value);
};

export const getCache = (cacheKey) => {
  return cache.get(cacheKey);
};

export const removeCache = (cacheKey) => {
  cacheKey.forEach((element) => {
    cache.del(element);
  });
};
