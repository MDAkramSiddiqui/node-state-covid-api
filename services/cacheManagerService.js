const path = require('path');

const logger = require('../utils/logger');
const constants = require('../constants');

const scriptName = path.basename(__filename);

class CacheManager {
  constructor() {
    logger.debug(scriptName, 'Init Cache Manager');
    this.cache = new Map();
  }

  get(key) {
    if (!key) {
      logger.error(scriptName, 'Invalid key for cache manager');
      return null;
    }

    logger.debug(scriptName, 'fetching data from cache');
    const data = this.cache.get(key);

    if (!data) {
      logger.info(scriptName, 'data not found in cache');
      return null;
    }

    if (data && data.ttl < Date.now()) {
      logger.info(scriptName, 'data found in cache but expired');
      this.cache.delete(key);
      return null;
    }

    logger.debug(scriptName, 'data fetch from cache success');
    return data.val;
  }

  set(key, val, ttl = constants.global.CACHE_DEFAULT_TTL) {
    if (!key || typeof (key) !== 'string') {
      logger.error(scriptName, 'Invalid key for cache manager');
      return false;
    }

    logger.debug(scriptName, 'saving data to cache');
    const data = {
      val,
      ttl: Date.now() + ttl,
    };

    this.cache.set(key, data);
    logger.debug(scriptName, 'data saving to cache success');
    return true;
  }
}

module.exports = new CacheManager();
