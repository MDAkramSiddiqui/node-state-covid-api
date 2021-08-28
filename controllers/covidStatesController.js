const path = require('path');

const catchAsync = require('../utils/catchAsync');
const CovidStatesService = require('../services/covidStatesService');
const logger = require('../utils/logger');

const scriptName = path.basename(__filename);

// eslint-disable-next-line
exports.getCovidStatesData = catchAsync(async (req, res, next) => {
  logger.debug(scriptName, 'getCovidStatesData()');

  if (res.locals.isFoundInCache) {
    return next();
  }

  res.locals.responseData = await CovidStatesService.getCovidStatesData();
  return next();
});
