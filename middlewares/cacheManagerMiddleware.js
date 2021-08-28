const path = require('path');
const catchAsync = require('../utils/catchAsync');
const cacheManager = require('../services/cacheManagerService');
const logger = require('../utils/logger');

const scriptName = path.basename(__filename);

exports.getFromCache = (cacheKey) => catchAsync(async (req, res, next) => {
  logger.debug(scriptName, 'getFromCache()');

  const data = cacheManager.get(cacheKey);
  if (!data) {
    res.locals.isFoundInCache = false;
    return next();
  }

  logger.info(scriptName, 'data found in cache returning response');
  res.locals.responseData = data;
  res.locals.isFoundInCache = true;
  return next();
});

exports.saveToCache = (cacheKey) => catchAsync(async (req, res, next) => {
  logger.debug(scriptName, 'saveToCache()');

  if (res.locals.isFoundInCache) {
    logger.info(scriptName, 'cached data, thus not saving it again');
    return next();
  }

  const result = cacheManager.set(cacheKey, res.locals.responseData);
  if (!result) {
    logger.info(scriptName, 'data saved in cache failed');
    return next();
  }

  logger.info(scriptName, 'data saved in cache successfully');
  return next();
});
